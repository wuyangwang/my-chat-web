import { genSystemMessage, getGeminiKey, showToast } from '@/utils'

import { GoogleGenerativeAI } from '@google/generative-ai'

let geminiClient = null

export async function chatWithGemini({ model, messages }, onCb = () => {}) {
	let apiKey = getGeminiKey()
	if (!apiKey) {
		showToast('请先配置Gemini Api Key', 'error')
		throw new Error('请先配置Gemini Api Key')
	}
	if (!geminiClient) {
		geminiClient = new GoogleGenerativeAI(apiKey)
	}
	const chatModel = geminiClient.getGenerativeModel({
		model: model,
		systemInstruction: genSystemMessage()[0].content
	})

	let inputs = {
		contents: convertMsg(messages)
	}

	try {
		const result = await chatModel.generateContentStream(inputs)
		for await (const chunk of result.stream) {
			onCb(chunk.text())
		}
		onCb('[DONE]') // 兼容格式
	} catch (error) {
		showToast(error.message)
	}
}

function convertMsg(arr) {
	return arr.map((item) => {
		return {
			role: item.role !== 'user' ? 'model' : 'user',
			parts: [{ text: item.content }]
		}
	})
}
