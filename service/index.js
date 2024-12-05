import { apiGet, apiPost } from './request'

export async function getModels(tag) {
	return await apiGet('/api/models', { tag })
}

export async function getChat(prompt) {
	return await apiGet('/api/chat', { prompt })
}
export async function getTranslate(text) {
	return await apiGet('/api/trans', { text })
}
export async function getImage(prompt) {
	return await apiGet('/api/gen-image', { prompt }, { isImage: true })
}
