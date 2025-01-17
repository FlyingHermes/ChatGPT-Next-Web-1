/**
 * Interfaces and classes for interacting with Google's AI models through the Gemini Pro API.
 * @module google
 * // Copyright (c) 2023 H0llyW00dzZ
 */

import { DEFAULT_API_HOST, DEFAULT_CORS_HOST, GEMINI_BASE_URL, Google, REQUEST_TIMEOUT_MS } from "@/app/constant";
import { ChatOptions, getHeaders, LLMApi, LLMModel, LLMUsage } from "../api";
import { useAccessStore, useAppConfig, useChatStore } from "@/app/store";
import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";
import { prettyObject } from "@/app/utils/format";
import { getClientConfig } from "@/app/config/client";
import Locale from "../../locales";
import { getServerSideConfig } from "@/app/config/server";
import { getProviderFromState } from "@/app/utils";
import { getNewStuff } from './NewStuffLLMs';


// Define interfaces for your payloads and responses to ensure type safety.
/**
 * Represents the response format received from Google's API.
 */
interface GoogleResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

/**
 * Represents a part of a message, typically containing text.
 */
interface MessagePart {
  text: string;
}

/**
 * Represents a full message, including the role of the sender and the message parts.
 */
interface Message {
  role: string;
  parts: MessagePart[];
}

/**
 * Configuration for the AI model used within the chat method.
 */
interface ModelConfig {
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  // top_k?: number; // Uncomment and add to the interface if used.
  model?: string;
  safetySettings?: [
    {
      category: string,
      threshold: string,
    },
    {
      category: string,
      threshold: string,
    },
    {
      category: string,
      threshold: string,
    },
    {
      category: string,
      threshold: string,
    },
  ],
}

/**
 * The GeminiProApi class provides methods to interact with the Google AI via the Gemini Pro API.
 * It implements the LLMApi interface.
 */
export class GeminiProApi implements LLMApi {
  /**
   * Extracts the message text from the GoogleResponse object.
   * @param {GoogleResponse} res - The response object from Google's API.
   * @returns {string} The extracted message text or error message.
   */
  extractMessage(res: GoogleResponse): string {
    const provider = getProviderFromState();
    console.log(`[${provider}] [Text Moderation] gemini-pro response: `, res);

    return (
      res.candidates?.[0]?.content?.parts?.[0]?.text ||
      res.error?.message ||
      ""
    );
  }
  /**
   * Sends a chat message to the Google API and handles the response.
   * @param {ChatOptions} options - The chat options including messages and configuration.
   * @returns {Promise<void>} A promise that resolves when the chat request is complete.
   */
  async chat(options: ChatOptions): Promise<void> {
    const provider = getProviderFromState();
    const cfgspeed_animation = useAppConfig.getState().speed_animation; // Get the animation speed from the app config
    const apiClient = this;
    const messages: Message[] = options.messages.map((v) => ({
      role: v.role.replace("assistant", "model").replace("system", "user"),
      parts: [{ text: v.content }],
    }));

    // google requires that role in neighboring messages must not be the same
    for (let i = 0; i < messages.length - 1;) {
      if (messages[i].role === messages[i + 1].role) {
        messages[i].parts = messages[i].parts.concat(messages[i + 1].parts);
        messages.splice(i + 1, 1);
      } else {
        i++;
      }
    }

    const appConfig = useAppConfig.getState().modelConfig;
    const chatConfig = useChatStore.getState().currentSession().mask.modelConfig;

    // Call getNewStuff to determine the max_tokens and other configurations
    const { max_tokens } = getNewStuff(
      options.config.model,
      chatConfig.max_tokens,
      chatConfig.system_fingerprint,
      chatConfig.useMaxTokens,
    );

    const modelConfig: ModelConfig = {
      ...appConfig,
      ...chatConfig,
      // Use max_tokens from getNewStuff if defined, otherwise use the existing value
      max_tokens: max_tokens !== undefined ? max_tokens : options.config.max_tokens,
    };

    const requestPayload = {
      contents: messages,
      generationConfig: {
        // stopSequences: [
        //   "Title"
        // ],
        temperature: modelConfig.temperature,
        ...(max_tokens !== undefined ? { maxOutputTokens: max_tokens } : {}), // Spread the max_tokens value if defined
        topP: modelConfig.top_p,
        // "topK": modelConfig.top_k,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
      ],
    };
    console.log(`[Request] [${provider}] payload: `, requestPayload);

    const shouldStream = !!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      const chatPath = this.path(Google.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
      };

      // make a fetch request
      const requestTimeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS,
      );
      if (shouldStream) {
        let responseText = "";
        let remainText = "";
        let streamChatPath = chatPath.replace(
          "generateContent",
          "streamGenerateContent",
        );
        let finished = false;

        let existingTexts: string[] = [];
        const finish = () => {
          finished = true;
          options.onFinish(existingTexts.join(""));
        };

        // Animate response to make it look smooth
        function animateResponseText() {
          if (finished || controller.signal.aborted) {
            responseText += remainText;
            finish();
            return;
          }

          if (remainText.length > 0) {
            const fetchCount = Math.max(1, Math.round(remainText.length / cfgspeed_animation));
            const fetchText = remainText.slice(0, fetchCount);
            responseText += fetchText;
            remainText = remainText.slice(fetchCount);
            options.onUpdate?.(responseText, fetchText);
          }

          // Use setTimeout to throttle the updates for smoothness
          setTimeout(animateResponseText, 1000 / cfgspeed_animation); // Adjust the delay based on animation speed
        }

        // start animaion
        animateResponseText();
        fetch(streamChatPath, chatPayload)
          .then((response) => {
            const reader = response?.body?.getReader();
            const decoder = new TextDecoder();
            let partialData = "";

            return reader?.read().then(function processText({
              done,
              value,
            }): Promise<any> {
              if (done) {
                console.log("[Streaming] Stream complete");
                // options.onFinish(responseText + remainText);
                finished = true;
                return Promise.resolve();
              }

              partialData += decoder.decode(value, { stream: true });

              try {
                let data = JSON.parse(ensureProperEnding(partialData));
                console.log("[Streaming] fetching json decoder: ", data);
                const textArray = data.reduce(
                  (acc: string[], item: { candidates: any[] }) => {
                    const texts = item.candidates.map((candidate) =>
                      candidate.content.parts
                        .map((part: { text: any }) => part.text)
                        .join(""),
                    );
                    return acc.concat(texts);
                  },
                  [],
                );

                if (textArray.length > existingTexts.length) {
                  const deltaArray = textArray.slice(existingTexts.length);
                  existingTexts = textArray;
                  remainText += deltaArray.join("");
                }
              } catch (error) {
                // console.log("[Response Animation] error: ", error,partialData);
                // skip error message when parsing json
              }

              // Continue the read loop without introducing artificial delay here
              // as the animation function is already throttled.
              return reader.read().then(processText);
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        const resJson = await res.json();

        if (resJson?.promptFeedback?.blockReason) {
          // being blocked
          options.onError?.(
            new Error(
              "Message is being blocked for reason: " +
              resJson.promptFeedback.blockReason,
            ),
          );
        }
        const message = this.extractMessage(resJson);
        options.onFinish(message);
      }
    } catch (e) {
      console.log("[Request] failed to make a chat request", e);
      options.onError?.(e instanceof Error ? e : new Error(String(e)));
    }
  }
  /**
   * Fetches the usage statistics of the LLM.
   * @returns {Promise<LLMUsage>} A promise that resolves to the usage statistics.
   */
  usage(): Promise<LLMUsage> {
    throw new Error("Method not implemented.");
  }
  /**
   * Fetches the available LLM models.
   * @returns {Promise<LLMModel[]>} A promise that resolves to an array of LLM models.
   */
  async models(): Promise<LLMModel[]> {
    return [];
  }
  /**
   * Constructs the appropriate URL path for API requests.
   *
   * This is a temporary fix to address an issue where the Google AI services
   * cannot be directly accessed from the Tauri desktop application. By routing
   * requests through a CORS proxy, we work around the limitation that prevents
   * direct API communication due to the desktop app's security constraints.
   *
   * @param {string} endpoint - The API endpoint that needs to be accessed.
   * @returns {string} The fully constructed URL path for the API request.
   */
  path(endpoint: string): string {
    const isApp = !!getClientConfig()?.isApp;
    // Use DEFAULT_CORS_HOST as the base URL if the client is a desktop app.
    const basePath = isApp ? `${DEFAULT_CORS_HOST}/api/google` : '/api/google';

    // Normalize the endpoint to prevent double slashes, but preserve "https://" if present.
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

    return `${basePath}/${normalizedEndpoint}`;
  }

}

function ensureProperEnding(str: string) {
  if (str.startsWith("[") && !str.endsWith("]")) {
    return str + "]";
  }
  return str;
}
