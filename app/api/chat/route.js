import { getRequestContext } from '@cloudflare/next-on-pages'
import * as utils from '@/app/api/utils/index'
import { chatSchema } from './schema'

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

	utils.validReqSchema(chatSchema, { prompt })

	let inputs = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant. 尽量使用中文回答，并保持简洁' },
			{ role: 'user', content: prompt }
		]
	}

	const response = await env.AI.run(aiModel.chat, inputs)
	return utils.returnJson(response)
}
