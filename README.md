## AI 聊天

> 基于 nextjs + cloudflare pages 部署 + cloudflare function 提供聊天 api

- UI 使用 nextjs + tailwindcss + shadcn-ui
- 使用 cloudflare 提供的 ai 功能
- 参考/app/api 目录

### 主要模型有

- 聊天 @cf/qwen/qwen1.5-14b-chat-awq/@cf/meta/llama-3.3-70b-instruct-fp8-fast
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

## 开发

```bash
pnpm run dev

pnpm run deploy
```

## 说明

- 使用 Cloudflare Pages 部署，每天免费 100000 次请求
- 聊天请求接口时默认携带 4 条历史记录作为上下文
- 图片生成和翻译不携带
- 本地存储
  - 聊天最大保存 500 条历史记录
  - 图片最大保存 50 张
  - 翻译最大保存 500 条
- 目前都是本地 localstorage 存储
