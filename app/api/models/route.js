import * as utils from '@/app/api/utils/index'

import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const aiModelList = [
	{
		tag: 'chat',
		models: [
			{
				name: 'llama3.1',
				model: '@cf/meta/llama-3.1-8b-instruct',
				maxCount: 500
			},
			{ name: 'qwen1.5', model: '', maxCount: 500 }
		]
	},
	{
		tag: 'gen-image',
		models: [
			{
				name: 'stable-diffusion',
				model: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
				maxCount: 500
			}
		]
	},
	{
		tag: 'translate',
		models: [
			{
				name: 'm2m100',
				model: '@cf/meta/m2m100-1.2b',
				maxCount: 500,
				items: [
					{ source: 'zh', target: 'en', name: '中转英' },
					{ source: 'en', target: 'zh', name: '英转中' },
					{ source: 'zh', target: 'ja', name: '中转日' },
					{ source: 'ja', target: 'zh', name: '日转中' }
				]
			}
		]
	}
]

export async function GET(request) {
	// const env = getRequestContext().env
	const tag = utils.getQuery(request, 'tag') || 'chat'
	const arr = aiModelList.filter((item) => item.tag === tag)

	return utils.returnJson(arr[0].models)
}
