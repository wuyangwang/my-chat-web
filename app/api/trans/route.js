import * as utils from '@/app/api/utils/index'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { transSchema } from './schema'

export const runtime = 'edge'

const aiModel = {
	chat: '@cf/meta/llama-3.1-8b-instruct',
	genImg: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
	trans: '@cf/meta/m2m100-1.2b'
}

export async function GET(request) {
	const env = getRequestContext().env
	const text = utils.getQuery(request, 'text')
	const source = utils.getQuery(request, 'source')
	const target = utils.getQuery(request, 'target')
	const model = utils.getQuery(request, 'model')

	const data = utils.validReqSchema(transSchema, { text, source, target })

	const inputs = {
		text: data.text,
		source_lang: data.source,
		target_lang: data.target
	}

	const response = await env.AI.run(aiModel.trans, inputs)
	return utils.returnJson(response.translated_text)
}
