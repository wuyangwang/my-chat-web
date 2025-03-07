import * as utils from '@/app/api/utils/index'

import { genImgSchema } from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const promptDefault = ''
const negativePromptDefault = ''

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')
	const model = utils.getQuery(request, 'model') || utils.defaultGenImageModel

	const [_, err] = utils.validReqSchema(genImgSchema, { prompt, model })
	if (err) return err

	let [params, isBase64] = getParamsByModel(model, prompt)
	const response = await env.AI.run(model, params)

	if (isBase64) {
		// Convert from base64 string
		const binaryString = atob(response.image)
		// Create byte representation
		const img = Uint8Array.from(binaryString, (m) => m.codePointAt(0))
		return utils.returnImage(img)
	} else {
		return utils.returnImage(response)
	}
}

// 返回的是base64 而不是image
const specialModel = ['@cf/black-forest-labs/flux-1-schnell']

function getParamsByModel(model, prompt) {
	if (specialModel.includes(model)) {
		return [
			{
				prompt: prompt + promptDefault,
				steps: 8 // 最大是8
			},
			true
		]
	}
	return [
		{
			prompt: prompt + promptDefault,
			negative_prompt: negativePromptDefault,
			height: 1024,
			width: 1024,
			num_steps: 16 // 最大是20
		},
		false
	]
}
