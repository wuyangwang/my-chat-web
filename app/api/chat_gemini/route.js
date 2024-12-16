import * as utils from '@/app/api/utils/index'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { chatPostSchema } from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const defaultModel = 'gemini-1.5-flash'
export async function POST(request) {
	const env = getRequestContext().env
	const body = await request.json()

	const [_, err] = utils.validReqSchema(chatPostSchema, body)
	if (err) return err

	// 个人私有使用 需要验证权限
	if (body.accessKey !== env.ACCESS_KEY) return utils.returnJsonError('accessKey error')

	let model = body.model || defaultModel
	const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
	const chatModel = genAI.getGenerativeModel({
		model: model,
		systemInstruction: 'You are a helpful assistant. 尽量使用中文回答.'
	})

	let inputs = {
		contents: convertMsg(body.messages)
	}

	// 创建流式响应
	const { readable, writable } = new TransformStream()
	const writer = writable.getWriter()

	;(async () => {
		const result = await chatModel.generateContentStream(inputs)
		for await (const chunk of result.stream) {
			const text = genRespContent(chunk.text())
			await writer.write(new TextEncoder().encode(`data: ${text}\n\n`))
		}
		await writer.write(new TextEncoder().encode(`data: [DONE]\n\n`))
		await writer.close()
	})()

	return utils.returnStreamText(readable)
}

function convertMsg(arr) {
	return arr.map((item) => {
		return {
			role: item.role !== 'user' ? 'model' : 'user',
			parts: [{ text: item.content }]
		}
	})
}

function genRespContent(str) {
	return JSON.stringify({ response: str })
}
