import { getRequestContext } from '@cloudflare/next-on-pages'
import * as utils from '@/app/api/utils/index'

export const runtime = 'edge'

const aiModelList = [
	{
		id: 1,
		name: '聊天(llama3.1)',
		model: '@cf/meta/llama-3.1-8b-instruct',
		desc: '有问有答、一对一聊天'
	},
	{
		id: 2,
		name: '图片生成(stable-diffusion)',
		model: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
		desc: '输入一段文字描述，自动生成图片'
	},
	{
		id: 3,
		name: '文本翻译(m2m100)',
		model: '@cf/meta/m2m100-1.2b',
		desc: '输入一段文字，自动翻译为英文'
	}
]

export async function GET(request) {
	// const env = getRequestContext().env

	return utils.returnJson(aiModelList)
}
