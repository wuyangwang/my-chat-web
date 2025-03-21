import { compressImage, genSystemMessage, getGeminiKey, showToast } from '@/utils'

import { GoogleGenerativeAI } from '@google/generative-ai'

let geminiClient = null

// 可以生成图片的模型
const genImage = (model) => model.indexOf('image-generation') > -1

export async function chatWithGemini({ model, messages }, onCb = () => {}) {
	let apiKey = getGeminiKey()
	if (!apiKey) {
		showToast('请先配置Gemini Api Key', 'error')
		throw new Error('请先配置Gemini Api Key')
	}
	if (!geminiClient) {
		geminiClient = new GoogleGenerativeAI(apiKey)
	}

	const config = {
		model: model
	}
	let inputs = {
		contents: convertMsg(messages)
	}
	if (genImage(model)) {
		config.generationConfig = { responseModalities: ['Text', 'Image'] }
		// 去除图片base64的聊天内容
		inputs.contents = inputs.contents.filter((item) => item.role === 'user')
	} else {
		config.systemInstruction = genSystemMessage()[0].content
	}
	const chatModel = geminiClient.getGenerativeModel(config)

	if (genImage) {
		const response = await chatModel.generateContent(inputs)
		for (const part of response.response.candidates[0].content.parts) {
			if (part.text) {
				onCb(part.text)
			} else if (part.inlineData) {
				const imageData = await compressImage(part.inlineData.data)
				// 特定结构
				onCb(`chat_img__${imageData}__chat_img`)
			}
		}
		onCb('[DONE]')
		return
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
