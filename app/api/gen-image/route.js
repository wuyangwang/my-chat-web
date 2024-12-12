import * as utils from '@/app/api/utils/index'

import { genImgSchema } from './schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const promptDefault =
	' ((extremely detailed CG unity 8k wallpaper),(masterpiece), (best quality), (ultra-detailed), (best illustration),(best shadow), (an extremely delicate and beautiful),dynamic angle, floating, finely detail, (bloom), (shine), glinting stars, classic)'
const negativePromptDefault =
	'(EasyNegative ,ng_deepnegative_v1_75t ,bad-image-v2-39000, bad-artist, bad-hands-5, bad_prompt_version2, bad-artist-anime,, (worst quality, low quality:1.4), (painting by bad-artist-anime:0.9), (painting by bad-artist:0.9), (bad_prompt_version2:0.8), (disfigured), (bad art), (deformed), (poorly drawn), (extra limbs), (close up), strange colours, blurry, boring, lackluster, letters, grayscale, huge breasts, large breasts jpeg artifacts, (signature), watermark, username, artist name, bad anatomy)'

export async function GET(request) {
	const env = getRequestContext().env
	const prompt = utils.getQuery(request, 'prompt')
	const model = utils.getQuery(request, 'model') || utils.defaultGenImageModel

	const [_, err] = utils.validReqSchema(genImgSchema, { prompt, model })
	if (err) return err

	// 先转为英文
	// const { translated_text } = await env.AI.run(defaultTransModel, {
	// 	text: prompt,
	// 	source_lang: 'zh',
	// 	target_lang: 'en'
	// })

	const response = await env.AI.run(model, {
		prompt: prompt + promptDefault,
		negative_prompt: negativePromptDefault,
		height: 512,
		width: 512
	})

	return utils.returnImage(response)
}
