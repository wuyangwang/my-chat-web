import { getRequestContext } from '@cloudflare/next-on-pages'
import * as utils from '@/app/api/utils/index'
import { genImgSchema } from './schema'

export const runtime = 'edge'

const aiModel = {
	chat: '@cf/meta/llama-3.1-8b-instruct',
	genImg: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
	trans: '@cf/meta/m2m100-1.2b'
}

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')

	const result = genImgSchema.safeParse({ prompt })
	if (!result.success) return utils.returnJsonError('Invalid prompt')

	const response = await env.AI.run(aiModel.genImg, {
		prompt: prompt
	})

	return new Response(response, { headers: { 'content-type': 'image/png' } })
}
