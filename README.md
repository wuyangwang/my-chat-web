## AI 聊天

> 基于 nextjs + cloudflare pages 部署 + cloudflare function 提供聊天 api

- UI 使用 nextjs + tailwindcss + shadcn-ui
- 使用 cloudflare 提供的 ai 功能

### 主要模型有

- 聊天 @cf/meta/llama-3.1-8b-instruct
- 图片生成 @cf/stabilityai/stable-diffusion-xl-base-1.0
- 翻译 @cf/meta/m2m100-1.2b

### 参考文档

- https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/
- https://developers.cloudflare.com/workers-ai/models/

## 开发

```bash
pnpm run dev

pnpm run deploy
```