import {
	ExternalModelHost,
	ModelTypeEnum,
	genSystemMessage,
	getDeepSeekKey,
	showToast
} from '@/utils'

import OpenAI from 'openai'

let deepseekClient

export async function chatWithDeepSeek({ model, messages }, onCb = () => {}) {
	let apiKey = getDeepSeekKey()
	if (!apiKey) {
		showToast('请先配置DeepSeek Api Key', 'error')
		throw new Error('请先配置DeepSeek Api Key')
	}
	if (!deepseekClient) {
		deepseekClient = new OpenAI({
			baseURL: ExternalModelHost[ModelTypeEnum.deepseek],
			apiKey: apiKey,
			dangerouslyAllowBrowser: true
		})
	}

	try {
		const stream = await deepseekClient.chat.completions.create({
			model: model,
			messages: genSystemMessage().concat(messages),
			stream: true
		})

		let isFirstChunk = false
		let isLastChunk = false
		for await (const chunk of stream) {
			// 推理
			let thinkingContent = chunk.choices[0]?.delta?.reasoning_content || ''
			if (thinkingContent) {
				if (!isFirstChunk) {
					onCb('#### 思考过程\n ```')
					isFirstChunk = true
				}
				onCb(thinkingContent)
			} else {
				if (isFirstChunk && !isLastChunk) {
					onCb('```\n')
					isLastChunk = true
				}
				onCb(chunk.choices[0]?.delta?.content || '')
			}
		}
		onCb('[DONE]') // 兼容格式
	} catch (error) {
		showToast(error.message)
	}
}
