import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";

const isApp = !!getClientConfig()?.isApp;

const cn = {
  WIP: "该功能仍在开发中……",
  Error: {
    Unauthorized: isApp
      ? "未经授权的访问，请在 [auth](/#/auth) 页面输入您的 OpenAI API Key。"
      : "访问密码不正确或为空，请前往[登录](/#/auth)页输入正确的访问密码，或者在[设置](/#/settings)页填入你自己的 OpenAI API Key。",
    Content_Policy: {
      Title:
        "您的请求因违反内容政策而被标记。",
      SubTitle: 
        "阅读详情：https://platform.openai.com/docs/guides/moderation/overview",
      Reason: {
        Title: "理由",
        sexual: "性别",
        hate: "仇恨",
        harassment: "骚扰",
        "self-harm": "自残",
        "sexual/minors": "性别/未成年人",
        "hate/threatening": "仇恨/威胁",
        "violence/graphic": "暴力/图形",
        "self-harm/intent": "自残/意图",
        "self-harm/instructions": "自残/指导",
        "harassment/threatening": "骚扰/威胁",
        violence: "暴力",
      },
    },
  },
  Auth: {
    Title: "需要密码",
    Tips: "管理员开启了密码验证，请在下方填入访问码",
    SubTips: "或者输入你的 OpenAI 或 Google API 密钥",
    Input: "在此处填写访问码",
    Confirm: "确认",
    Later: "稍后再说",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`,
  },
  Chat: {
    SubTitle: (count: number) => `共 ${count} 条对话`,
    EditMessage: {
      Title: "编辑消息记录",
      Topic: {
        Title: "聊天主题",
        SubTitle: "更改当前聊天主题",
      },
    },
    Actions: {
      ChatList: "查看消息列表",
      CompressedHistory: "查看压缩后的历史 Prompt",
      Export: "导出聊天记录",
      Copy: "复制",
      Stop: "停止",
      Retry: "重试",
      Pin: "固定",
      PinToastContent: "已将 1 条对话固定至预设提示词",
      PinToastAction: "查看",
      PinAppContent: {
        Pinned : "桌面应用已固定",
        UnPinned: "桌面应用已取消固定",
      },  
      Delete: "删除",
      Edit: "编辑",
    },
    Commands: {
      new: "新建聊天",
      newm: "从面具新建聊天",
      next: "下一个聊天",
      prev: "上一个聊天",
      restart: "重新启动客户端",
      clear: "清除上下文",
      del: "删除聊天",
      save: "保存当前会话聊天",
      load: "加载会话聊天",
      copymemoryai: "复制一个记忆会话的提示AI",
      updatemasks: "更新一个用于掩码的记忆会话提示",
      summarize: "总结当前会话的聊天内容",
      UI: {
        MasksSuccess: "成功更新了掩码会话",
        MasksFail: "无法更新掩码会话",
        Summarizing: "正在总结当前会话的内容",
        SummarizeSuccess: "成功总结此次聊天的会话内容",
        SummarizeFail: "无法总结此次聊天的会话内容",
      },
    },
    InputActions: {
      Stop: "停止响应",
      ToBottom: "滚到最新",
      Theme: {
        auto: "自动主题",
        light: "亮色模式",
        dark: "深色模式",
      },
      Prompt: "快捷指令",
      Masks: "所有面具",
      Clear: "清除聊天",
      Settings: "对话设置",
    },
    Rename: "重命名对话",
    Typing: "正在输入…",
    GeneratingImage: "生成图片中...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} 发送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 换行";
      }
      return inputHints + "，/ 触发补全，: 触发命令";
    },
    Send: "发送",
    Config: {
      Reset: "清除记忆",
      SaveAs: "存为面具",
    },
    IsContext: "预设提示词",
  },
  Export: {
    Title: "分享聊天记录",
    Copy: "全部复制",
    Download: "下载文件",
    Share: "分享到 ShareGPT",
    MessageFromYou: "用户",
    MessageFromChatGPT: {
      NoRole: "ChatGPT",
      RoleAssistant: "助手",
      RoleSystem: "系统",
      SysMemoryPrompt: "系统记忆提示",
    },
    Format: {
      Title: "导出格式",
      SubTitle: "可以导出 Markdown 文本或者 PNG 图片",
    },
    IncludeContext: {
      Title: "包含面具上下文",
      SubTitle: "是否在消息中展示面具上下文",
    },
    IncludeSysMemoryPrompt: {
      Title: "包含系统记忆提示",
      SubTitle: "在掩码中是否包含系统记忆提示",
    },
    Steps: {
      Select: "选取",
      Preview: "预览",
    },
    Image: {
      Toast: "正在生成截图",
      Modal: "长按或右键保存图片",
    },
  },
  Select: {
    Search: "搜索消息",
    All: "选取全部",
    Latest: "最近几条",
    Clear: "清除选中",
  },
  Memory: {
    Title: "历史摘要",
    EmptyContent: "对话内容过短，无需总结",
    Send: "自动压缩聊天记录并作为上下文发送",
    Copy: "复制摘要",
    Reset: "[unused]",
    ResetConfirm: "确认清空历史摘要？",
  },
  Home: {
    NewChat: "新的聊天",
    DeleteChat: "确认删除选中的对话？",
    DeleteToast: "已删除会话",
    Revert: "撤销",
    Search: "输入筛选的关键词",
  },
  Settings: {
    Title: "设置",
    SubTitle: "所有设置选项",

    Danger: {
      Reset: {
        Title: "重置所有设置",
        SubTitle: "重置所有设置项回默认值",
        Action: "立即重置",
        Confirm: "确认重置所有设置？",
      },
      Clear: {
        Title: "清除所有数据",
        SubTitle: "清除所有聊天、设置数据",
        Action: "立即清除",
        Confirm: "确认清除所有聊天、设置数据？",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有语言",
    },
    Avatar: "头像",
    FontSize: {
      Title: "字体大小",
      SubTitle: "聊天内容的字体大小",
    },
    InjectSystemPrompts: {
      Title: "注入系统级提示信息",
      SubTitle: "强制给每次请求的消息列表开头添加一个模拟 ChatGPT 的系统提示",
    },
    InputTemplate: {
      Title: "用户输入预处理",
      SubTitle: "用户最新的一条消息会填充到此模板",
    },

    Update: {
      Version: (x: string) => `当前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "检查更新",
      IsChecking: "正在检查更新...",
      FoundUpdate: (x: string) => `发现新版本：${x}`,
      GoToUpdate: "前往更新",
      IsUpdating: "正在更新...",
      UpdateSuccessful: "已成功更新到最新版本",
      UpdateFailed: "更新失败",
    },
    SendKey: "发送键",
    PinAppKey: "固定应用快捷键",
    SystemPromptTemplate: {
      Title: "系统提示模板",
      SubTitle: "每个请求的系统提示模板。它可以使用本地语言。如果没有列出该语言，则将使用默认语言（英语）。",
    },
    Theme: "主题",
    TightBorder: "无边框模式",
    SendPreviewBubble: {
      Title: "预览气泡",
      SubTitle: "在预览气泡中预览 Markdown 内容",
    },
    AutoGenerateTitle: {
      Title: "自动生成标题",
      SubTitle: "根据对话内容生成合适的标题",
    },
    SpeedAnimation: {
      Title: "动画速度响应",
      SubTitle: "通过控制动画期间响应文本的显示速度，您可以控制动画速度响应",
    },
    Sync: {
      CloudState: "云端数据",
      NotSyncYet: "还没有进行过同步",
      Success: "同步成功",
      Fail: "同步失败",

      Config: {
        Modal: {
          Title: "配置云同步",
          Check: "检查可用性",
        },
        SyncType: {
          Title: "同步类型",
          SubTitle: "选择喜爱的同步服务器",
        },
        Proxy: {
          Title: "启用代理",
          SubTitle: "在浏览器中同步时，必须启用代理以避免跨域限制",
        },
        ProxyUrl: {
          Title: "代理地址",
          SubTitle: "仅适用于本项目自带的跨域代理",
        },

        AccessControl: {
          Title: "启用覆盖访问控制",
          SubTitle: "仅适用于覆盖访问控制设置，例如访问代码",
        },
        LockClient: {
          Title: "启用不同步当前数据",
          SubTitle: "仅同步其他来源的数据，而不同步当前数据",
        },

        WebDav: {
          Endpoint: {
            Name: "WebDav 终端点",
            SubTitle: "配置 WebDav 终端点",
          },
          UserName: {
            Name: "用户名",
            SubTitle: "配置用户名",
          },
          Password: {
            Name: "密码",
            SubTitle: "配置密码",
          },
          FileName: {
            Name: "文件名",
            SubTitle: "文件名，例如：backtrackz.json（必须是 JSON 文件）",
          },
        },
        GithubGist: {
          GistID: {
            Name: "Github Gist ID",
            SubTitle:
              "您的 Gist ID 位置，例如：gist.github.com/H0llyW00dzZ/<gistid>/等。复制 <gistid> 并粘贴到这里。",
          },
          FileName: {
            Name: "文件名",
            SubTitle: "文件名，例如：backtrackz.json（必须是 JSON 文件）",
          },
          AccessToken: {
            Name: "访问令牌",
            SubTitle: "确保您具有同步的权限。在那里启用私有和公开。",
          },
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "备份名称",
          Password: "UpStash Redis REST Token",
        },

        GoSync: {
          Endpoint: "GoSync REST URL",
          UserName: "备份名称",
          Password: "GoSync REST 令牌",
          FileName: "文件名",
        },

      },

      LocalState: "本地数据",
      Overview: (overview: any) => {
        return `${overview.chat} 次对话，${overview.message} 条消息，${overview.prompt} 条提示词，${overview.mask} 个面具`;
      },
      Description: {
        Chat: (overview: any) => {
          const title = "次对话";
          const description = `${overview.chat} 次对话，, ${overview.message} 条消息`;
          return { title, description };
        },
        Prompt: (overview: any) => {
          const title = "条提示词";
          const description = `${overview.prompt} 条提示词`;
          return { title, description };
        },
        Masks: (overview: any) => {
          const title = "个面具";
          const description = `${overview.mask} 个面具`;
          return { title, description };
        },
      },
      ImportFailed: "导入失败",
      ImportChatSuccess: "聊天数据导入成功。",
      ImportPromptsSuccess: "成功导入 Prompts 数据。",
    },
    Mask: {
      Splash: {
        Title: "面具启动页",
        SubTitle: "新建聊天时，展示面具启动页",
      },
      Builtin: {
        Title: "隐藏内置面具",
        SubTitle: "在所有面具列表中隐藏内置面具",
      },
    },
    Prompt: {
      Disable: {
        Title: "禁用提示词自动补全",
        SubTitle: "在输入框开头输入 / 即可触发自动补全",
      },
      List: "自定义提示词列表",
      ListCount: (builtin: number, custom: number) =>
        `内置 ${builtin} 条，用户定义 ${custom} 条`,
      Edit: "编辑",
      Modal: {
        Title: "提示词列表",
        Add: "新建",
        Search: "搜索提示词",
      },
      EditModal: {
        Title: "编辑提示词",
      },
    },
    HistoryCount: {
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
    },
    CompressThreshold: {
      Title: "历史消息长度压缩阈值",
      SubTitle: "当未压缩的历史消息超过该值时，将进行压缩",
    },
    Token: {
      Title: "API Key",
      SubTitle: "使用自己的 Key 可绕过密码访问限制",
      Placeholder: "OpenAI API Key",
    },

    Usage: {
      Title: "余额查询",
      SubTitle(used: any, total: any) {
        const hardLimitusd = total.hard_limit_usd !== undefined ? new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'USD' }).format(total.hard_limit_usd) : "未知";
        const hardLimit = total.system_hard_limit_usd !== undefined ? new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'USD' }).format(total.system_hard_limit_usd) : "未知";
        const usedFormatted = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'USD' }).format(used);
        return `本月使用金额：${usedFormatted}，硬限制金额：${hardLimitusd}，批准使用限额：${hardLimit}`;
      },
      IsChecking: "正在检查…",
      Check: "重新检查",
      NoAccess: `在以"sess-"为前缀的API密钥中输入会话密钥以检查余额。`,
    },
    AccessCode: {
      Title: "访问密码",
      SubTitle: "管理员已开启加密访问",
      Placeholder: "请输入访问密码",
    },
    Endpoint: {
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
    },

    Access: {
      AccessCode: {
        Title: "访问密码",
        SubTitle: "管理员已开启加密访问",
        Placeholder: "请输入访问密码",
      },
      CustomEndpoint: {
        Title: "自定义接口",
        SubTitle: "是否使用自定义 Azure 或 OpenAI 服务",
      },
      Provider: {
        Title: "模型服务商",
        SubTitle: "切换不同的服务商",
      },
      OpenAI: {
        ApiKey: {
          Title: "API Key",
          SubTitle: "使用自定义 OpenAI Key 绕过密码访问限制",
          Placeholder: "OpenAI API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "除默认地址外，必须包含 http(s)://",
        },
      },
      Azure: {
        ApiKey: {
          Title: "接口密钥",
          SubTitle: "使用自定义 Azure Key 绕过密码访问限制",
          Placeholder: "Azure API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "样例：",
        },

        ApiVerion: {
          Title: "接口版本 (azure api version)",
          SubTitle: "选择指定的部分版本",
        },
      },
      Google: {
        ApiKey: {
          Title: "接口密钥",
          SubTitle: "使用自定义 Google AI Studio API Key 绕过密码访问限制",
          Placeholder: "Google AI Studio API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "不包含请求路径，样例：",
        },

        ApiVerion: {
          Title: "接口版本 (gemini-pro api version)",
          SubTitle: "选择指定的部分版本",
        },
      },
      CustomModel: {
        Title: "自定义模型名",
        SubTitle: "增加自定义模型可选项，使用英文逗号隔开",
      },
    },

    Model: "模型 (model)",
    Temperature: {
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
    },
    TopP: {
      Title: "核采样 (top_p)",
      SubTitle: "与随机性类似，但不要和随机性一起更改",
    },
    MaxTokens: {
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
    },
    UseMaxTokens: {
      Title: "使用最大标记数",
      SubTitle: "是否使用最大标记数。",
    },
    PresencePenalty: {
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
    },
    FrequencyPenalty: {
      Title: "频率惩罚度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重复字词",
    },
    TextModeration: {
      Title: "文本审核",
      SubTitle: "通过文本审核来检查内容是否符合 OpenAI 的使用政策。",
    },
    NumberOfImages: {
      Title: "创建图片数量",
      SubTitle:
        "要生成的图像数量\n必须介于1和10之间。对于dall-e-3，仅支持1。",
    },
    QualityOfImages: {
      Title: "创建图片质量",
      SubTitle:
        "将要生成的图像的质量\n此配置仅适用于dall-e-3。",
    },
    SizeOfImages: {
      Title: "图片尺寸",
      SubTitle:
        "生成图像的尺寸\nDALL·E-2：必须是`256x256`、`512x512`或`1024x1024`之一。\nDALL-E-3：必须是`1024x1024`、`1792x1024`或`1024x1792`之一。",
    },
    StyleOfImages: {
      Title: "图片风格",
      SubTitle:
        "生成图像的风格\n必须是生动或自然之一\n此配置仅适用于dall-e-3",
    },
  },
  Store: {
    DefaultTopic: "新的聊天",
    BotHello: "有什么可以帮你的吗",
    Error: "出错了，稍后重试吧",
    Prompt: {
      History: (content: string) => "这是历史聊天总结作为前情提要：" + content,
      Topic:
        "使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，不要加粗，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下对话内容，用作后续的上下文提示 prompt，控制在 200 字以内",
    },
  },
  Copy: {
    Success: "已写入剪切板",
    Failed: "复制失败，请赋予剪切板权限",
  },
  Download: {
    Success: "内容已下载到您的目录。",
    Failed: "下载失败。",
  },
  Context: {
    Toast: (x: any) => `包含 ${x} 条预设提示词`,
    Edit: "当前对话设置",
    Add: "新增一条对话",
    Clear: "上下文已清除",
    Revert: "恢复上下文",
  },
  Plugin: {
    Name: "插件",
  },
  FineTuned: {
    Sysmessage: "你是一个助手",
  },
  Changelog: {
    Name: "Change Log",
  },
  PrivacyPage: {
    Name: "隐私",
    Confirm: "同意",
  },
  Mask: {
    Name: "面具",
    Page: {
      Title: "预设角色面具",
      SubTitle: (count: number) => `${count} 个预设角色定义`,
      Search: "搜索角色面具",
      Create: "新建",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 条预设对话`,
      Chat: "对话",
      View: "查看",
      Edit: "编辑",
      Delete: "删除",
      DeleteConfirm: "确认删除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `编辑预设面具 ${readonly ? "（只读）" : ""}`,
      Download: "下载预设",
      Clone: "克隆预设",
    },
    Config: {
      Avatar: "角色头像",
      Name: "角色名称",
      Sync: {
        Title: "使用全局设置",
        SubTitle: "当前对话是否使用全局模型设置",
        Confirm: "当前对话的自定义设置将会被自动覆盖，确认启用全局设置？",
      },
      HideContext: {
        Title: "隐藏预设对话",
        SubTitle: "隐藏后预设对话不会出现在聊天界面",
        UnHide: "在聊天中显示默认对话框",
        Hide: "在聊天中隐藏默认对话框",        
      },
      Share: {
        Title: "分享此面具",
        SubTitle: "生成此面具的直达链接",
        Action: "复制链接",
      },
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "直接开始",
    NotShow: "不再展示",
    ConfirmNoShow: "确认禁用？禁用后可以随时在设置中重新启用。",
    Title: "挑选一个面具",
    SubTitle: "现在开始，与面具背后的灵魂思维碰撞",
    More: "查看全部",
  },

  URLCommand: {
    Code: "检测到链接中已经包含访问码，是否自动填入？",
    Settings: "检测到链接中包含了预制设置，是否自动填入？",
  },

  UI: {
    Confirm: "确认",
    Cancel: "取消",
    Close: "关闭",
    Create: "新建",
    Continue: "继续",
    Edit: "编辑",
    Export: "导出",
    Import: "导入",
    Sync: "同步",
    Config: "配置",
    Manage: "管理",
  },
  // don't linting this `System_Template` keep format like this
  // this a object not string
  System_Template: `
您正在与ChatGPT对话，这是一个由OpenAI训练的大型语言模型。
知识截止点: {{cutoff}}
当前模型: {{model}}
当前时间: {{time}}
Latex 行内公式: $x^2$ 
Latex 块公式: $$e=mc^2$$`,
  Label_System_Template: {
    Default: "默认系统模板",
    Local: "本地系统模板",
  },
  Exporter: {
    Description: {
      Title: "只有清除上下文之后的消息会被展示",
    },
    Model: "模型",
    ServiceProvider: "服务提供商",
    Messages: "消息",
    Topic: "主题",
    Time: "时间",
  },
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
