import * as utils from '@/app/api/utils/index'

import { chatSchema } from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const aiModel = {
	chat: '@cf/meta/llama-3.1-8b-instruct',
	genImg: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
	trans: '@cf/meta/m2m100-1.2b'
}

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')
	const model = utils.getQuery(request, 'model')

	const [_, err] = utils.validReqSchema(chatSchema, { prompt })
	if (err) return err

	let inputs = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant. 尽量使用中文回答，并保持简洁' },
			{ role: 'user', content: prompt }
		]
	}

	const res = await env.AI.run(aiModel.chat, inputs)
	return utils.returnJson({ text: res.response })
}

export async function POST(request) {
	const env = getRequestContext().env
	const body = await request.json()

	const [_, err] = utils.validReqSchema(chatSchema, body)
	if (err) return err

	let inputs = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant. 尽量使用中文回答，并保持简洁' },
			{ role: 'user', content: prompt }
		]
	}

	const res = await env.AI.run(aiModel.chat, inputs)
	return utils.returnJson({ text: res.response })
}
