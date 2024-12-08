import * as utils from '@/app/api/utils/index'

import { chatSchema } from './schema'
import { defaultChatModel } from '../utils/models'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')
	const model = utils.getQuery(request, 'model') || defaultChatModel

	const [_, err] = utils.validReqSchema(chatSchema, { prompt, model })
	if (err) return err

	let inputs = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant. 尽量使用中文回答，并保持简洁' },
			{ role: 'user', content: prompt }
		]
		// stream: true
	}

	const res = await env.AI.run(model, inputs)
	return utils.returnJson({ text: res.response })
}

export async function POST(request) {
	const env = getRequestContext().env
	const body = await request.json()

	const [_, err] = utils.validReqSchema(chatSchema, body)
	if (err) return err

	let model = body.model || defaultChatModel
	let inputs = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant. 尽量使用中文回答，并保持简洁' },
			{ role: 'user', content: body.prompt }
		],
		stream: true // 启用流式传输
	}

	const stream = await env.AI.run(model, inputs)
	return utils.returnStreamText(stream)
	// return utils.returnJson({ text: res.response })
}
