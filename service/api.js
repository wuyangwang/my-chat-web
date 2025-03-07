import { apiGet, apiPost } from './request'

import { streamReader } from '@/utils'

// 默认请求api 后端使用Cloudflare
export async function getModels(tag) {
	return await apiGet('/api/models', { tag })
}

export async function chatWithApi(data, onCb) {
	const result = await apiPost('/api/chat', data, { isStream: true })
	await streamReader(result, onCb)
}

export async function chatWithApiGet(data) {
	return await apiGet('/api/chat', data)
}
export async function transWithApi({ text, source = '', target = '' }) {
	return await apiGet('/api/trans', { text, source, target })
}
export async function genImageWithApi({ prompt, model = '' }, preTrans) {
	let finalPrompt = prompt
	if (preTrans) {
		// 先使用接口翻译为英文
		const transData = await chatWithApiGet({ prompt: '把以下文字翻译为英文，注意直接返回翻译后的内容，不要引号：' + prompt })
		finalPrompt = transData.text
	}
	return await apiGet('/api/gen-image', { prompt: finalPrompt, model }, { isImage: true })
}
