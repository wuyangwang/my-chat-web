import { apiGet } from './request'

export async function getModels(tag) {
	return await apiGet('/api/models', { tag })
}

export async function getImage(prompt) {
	return await apiGet('/api/gen-image', { prompt }, { isFile: true })
}
