export * from './gemini'
export * from './grok'
export * from './ollama'
export * from './openai'
export * from './api'

export async function mock() {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ text: '注意：开发环境使用mock接口数据', url: 'xxx' }), 2000)
	})
}
