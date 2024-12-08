import * as utils from '@/app/api/utils/index'

import { defaultGenImageModel, defaultTransModel } from '../utils/models'

import { genImgSchema } from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')
	const model = utils.getQuery(request, 'model') || defaultGenImageModel

	const [_, err] = utils.validReqSchema(genImgSchema, { prompt, model })
	if (err) return err

	// 先转为英文
	const { translated_text } = await env.AI.run(defaultTransModel, {
		text: prompt,
		source_lang: 'zh',
		target_lang: 'en'
	})

	const response = await env.AI.run(model, {
		prompt: translated_text || prompt
	})

	return new Response(response, { headers: { 'content-type': 'image/png' } })
}
