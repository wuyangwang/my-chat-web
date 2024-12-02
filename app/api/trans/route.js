import { getRequestContext } from '@cloudflare/next-on-pages'
import * as utils from '@/app/api/utils/index'
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
	const to = utils.getQuery(request, 'to')
	const model = utils.getQuery(request, 'model')

	const result = transSchema.safeParse({ text, to })
	if (!result.success) return utils.returnJsonError('Invalid text')

	const isEn = to === 'en'
	const inputs = {
		text: text,
		source_lang: isEn ? 'zh' : 'en',
		target_lang: isEn ? 'en' : 'zh'
	}

	const response = await env.AI.run(aiModel.trans, inputs)
	return utils.returnJson(response)
}
