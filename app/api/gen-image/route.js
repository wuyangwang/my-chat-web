import * as utils from '@/app/api/utils/index'

import { genImgSchema } from './schema'
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

	utils.validReqSchema(genImgSchema, { prompt })

	// 先转为英文
	const res = await fetch('/api/trans?prompt=' + encodeURIComponent(prompt))
	const { data } = await res.json()

	const response = await env.AI.run(aiModel.genImg, {
		prompt: data || prompt
	})

	return new Response(response, { headers: { 'content-type': 'image/png' } })
}
