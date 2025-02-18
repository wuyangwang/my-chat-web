import {
	ExternalModelHost,
	ModelTypeEnum,
	formatStreamResponse,
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

		await formatStreamResponse(stream, onCb)
	} catch (error) {
		showToast(error.message)
	}
}
