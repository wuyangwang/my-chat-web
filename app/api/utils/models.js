export const aiModelList = [
	{
		tag: 'chat',
		models: [
			{
				name: 'llama3.3-70b',
				model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
				maxCount: 1000
			},
			{ name: 'qwen1.5-14b', model: '@cf/qwen/qwen1.5-14b-chat-awq', maxCount: 1000 },
			{
				name: 'llama3.1-70b',
				model: '@cf/meta/llama-3.1-70b-instruct',
				maxCount: 1000
			},
			{
				name: 'llama3.1-8b',
				model: '@cf/meta/llama-3.1-8b-instruct',
				maxCount: 1000
			},
			{
				name: 'deepseek-coder-6.7b',
				model: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
				maxCount: 1000
			}
		]
	},
	{
		tag: 'gen-image',
		models: [
			{
				name: 'black-forest-labs/flux-1-schnell',
				model: '@cf/black-forest-labs/flux-1-schnell',
				maxCount: 1000
			},
			{
				name: 'stable-diffusion-xl-lightning',
				model: '@cf/bytedance/stable-diffusion-xl-lightning',
				maxCount: 1000
			},
			{
				name: 'stable-diffusion-xl',
				model: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
				maxCount: 1000
			},
			// {
			// 	name: 'lykon/dreamshaper',
			// 	model: '@cf/lykon/dreamshaper-8-lcm',
			// 	maxCount: 1000
			// }
			// {
			// 	name: 'stable-diffusion-v1.5',
			// 	model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
			// 	maxCount: 1000
			// }
		]
	},
	{
		tag: 'translate',
		models: [
			{
				name: 'm2m100',
				model: '@cf/meta/m2m100-1.2b',
				maxCount: 1000,
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

export const defaultChatModel = aiModelList[0].models[0].model
export const defaultGenImageModel = aiModelList[1].models[0].model
export const defaultTransModel = aiModelList[2].models[0].model
