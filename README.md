## AI 聊天

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

### ollama 使用（仅本地）

聊天兼容了 ollama api，如果你本地安装了 ollama，可以在开发时使用 ollama 的/api/chat 接口，需要.env.development 文件配置：

```
NEXT_PUBLIC_LOCAL_API_HOST="http://localhost:11434"
NEXT_PUBLIC_ENABLE_OLLAMA_API="true"
```

## 说明

- 使用 Cloudflare Pages 部署，每天免费 100000 次请求
- 聊天请求接口时默认携带 4 条历史记录作为上下文(图片生成和翻译不携带)
- 本地存储
  - 聊天最大保存 500 条历史记录
  - 图片最大保存 50 张
  - 翻译最大保存 500 条
- 目前都是本地 localstorage 存储
- 本地开发时无法调用真实的接口如/api/chat，使用 mock 接口模拟
