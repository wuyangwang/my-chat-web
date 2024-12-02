import * as utils from '../../util/index'

const aiModel = {
	chat: '@cf/meta/llama-3.1-8b-instruct',
	genImg: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
	trans: '@cf/meta/m2m100-1.2b'
}

export async function handleChat(req, env) {
	let prompt = utils.getQuery(req, 'prompt')
	console.log('🚀 ~ handleChat ~ req:', prompt)

	if (!prompt || prompt.length > 100) {
		return utils.returnJsonError('prompt参数错误')
	}

	let inputs = {
		// prompt: prompt
		messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: prompt }
		]
	}

	const response = await env.AI.run(aiModel.chat, inputs)
	return utils.returnJson(response)
}

export async function handleGenImg(req, env) {
	let prompt = utils.getQuery(req, 'prompt')
	console.log('🚀 ~ handleGenImg ~ req:', prompt)

	if (!prompt || prompt.length > 100) {
		return utils.returnJsonError('prompt参数错误')
	}

	const response = await env.AI.run(aiModel.genImg, {
		prompt: prompt
	})
	return new Response(response, { headers: { 'content-type': 'image/png' } })
}

export async function handleTrans(req, env) {
	let text = utils.getQuery(req, 'text')
	let to = utils.getQuery(req, 'to') || 'en'
	console.log('🚀 ~ handleTrans ~ req:', text, to)

	if (!text || text.length > 100) {
		return utils.returnJsonError('text参数错误')
	}

	const isEn = to === 'en'
	const inputs = {
		text: text,
		source_lang: isEn ? 'zh' : 'en',
		target_lang: isEn ? 'en' : 'zh'
	}

	const response = await env.AI.run(aiModel.trans, inputs)
	return utils.returnJson(response)
}
