import { ExternalModelHost, ModelTypeEnum, getGrokKey } from '@/utils'

import OpenAI from 'openai'

let grokClient

export async function chatWithGrok({ model, messages }, onCb = () => {}) {
	if (!grokClient) {
		grokClient = new OpenAI({
			apiKey: getGrokKey(),
			baseURL: ExternalModelHost[ModelTypeEnum.grok]
		})
	}

	const stream = await grokClient.chat.completions.create({
		model: model,
		messages: genSystemMessage().concat(messages),
		stream: true
	})

	for await (const chunk of stream) {
		onCb(chunk.choices[0]?.delta?.content || '')
	}
	onCb('[DONE]') // 兼容格式
}
