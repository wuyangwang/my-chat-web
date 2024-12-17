import { genSystemMessage, getOpenAiKey, showToast } from '@/utils'

import OpenAI from 'openai'

let openAiClient

export async function chatWithOpenAI({ model, messages }, onCb = () => {}) {
	let apiKey = getOpenAiKey()
	if (!apiKey) {
		showToast('请先配置OpenAI Api Key', 'error')
		throw new Error('请先配置OpenAI Api Key')
	}
	if (!openAiClient) {
		openAiClient = new OpenAI({
			apiKey: apiKey,
			dangerouslyAllowBrowser: true
		})
	}

	try {
		const stream = await openAiClient.chat.completions.create({
			model: model,
			messages: genSystemMessage().concat(messages),
			stream: true
		})

		for await (const chunk of stream) {
			onCb(chunk.choices[0]?.delta?.content || '')
		}
		onCb('[DONE]') // 兼容格式
	} catch (error) {
		showToast(error.message)
	}
}
