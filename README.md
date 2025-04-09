## AI 聊天

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wuyangwang/my-chat-web)

> 基于 nextjs + cloudflare pages 部署 + cloudflare workers ai 提供聊天 api

- UI 使用 nextjs + tailwindcss + shadcn-ui
- 使用 cloudflare 提供的 workers ai 功能
- 参考/app/api 目录

体验地址：https://duyaxuan.xyz

![image](https://github.com/user-attachments/assets/fe25176f-8b02-4f7b-918b-08a512224647)

### 主要模型

> /app/api/utils/models.js

- 聊天
  - @cf/qwen/qwen1.5-14b-chat-awq
  - @cf/meta/llama-3.3-70b-instruct-fp8-fast
- 图片生成 @cf/stabilityai/stable-diffusion-xl-base-1.0
- 翻译 @cf/meta/m2m100-1.2b

### 外部模型使用

目前兼容了以下模型 需要自己提供 api key 使用 具体见`/utils/models.js`

- DeepSeek
- Gemini
- Grok
- OpenAI
- Ollama 本地

### 参考文档

- https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/
- https://developers.cloudflare.com/workers-ai/models/

### 参考 UI 样式

- https://github.com/jakobhoeg/shadcn-chat
- https://github.com/bundui/components
- https://github.com/Edil-ozi/edil-ozi
- https://github.com/nikhils4/ui-beats
- https://github.com/baiwumm/next-daily-hot

## 开发

```bash
pnpm run dev

pnpm run deploy
```

本地开发调试接口时，

- 可以设置.env 文件`NEXT_PUBLIC_MOCK_API='true'`来启用 mock 数据，不调用正式接口。
- 或者使用本地 Ollama 模型或者使用 Grok 等自己有 api key 的模型。

## 部署

> 仅支持部署到 cloudflare

通过 cf 提供的 cli 部署

- 仓库下载到本地 安装依赖 pnpm i
- 更改 wrangler.toml 里的 name 为你想要的名字
- 执行 pnpm run deploy
- 看终端提示 第一次需要登录
- 完成 可以到 cf dashboard 里查看

## 说明

- 使用 Cloudflare Pages 部署，每天免费 100000 次请求
- 聊天请求接口时默认携带 4 条历史记录作为上下文(图片生成和翻译不携带)
- 本地存储
  - 聊天最大保存 500 条历史记录
  - 图片最大保存 100 张
  - 翻译最大保存 500 条
- 目前都是本地 localstorage 存储
- 本地开发时无法调用真实的接口如/api/chat，可以使用 ollama 模型

## TODO

- [ ] 语音输入-转文字

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wuyangwang/my-chat-web&type=Date)](https://star-history.com/#wuyangwang/my-chat-web&Date)
