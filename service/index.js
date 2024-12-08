import { apiGet, apiPost } from './request'

export async function getModels(tag) {
	return await apiGet('/api/models', { tag })
}

export async function getChat({ prompt, model }) {
	return await apiPost('/api/chat', { prompt, model }, { isStream: true })
}
export async function getTranslate({ text, source, target }) {
	return await apiGet('/api/trans', { text, source, target })
}
export async function getImage({ prompt, model }) {
	return await apiGet('/api/gen-image', { prompt, model }, { isImage: true })
}
export async function mock() {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ text: 'mock', url: 'xxx' }), 2000)
	})
}
