import { getUrlById, showToast } from '@/utils'

const host = process.env.NEXT_PUBLIC_HOST
export async function getModels() {
	const data = await fetch(`/api/models`)
	const res = await data.json()
	// await sleep(5000)
	if (res.code !== 200) {
		showToast('获取模型失败', 'error')
		return []
	}
	let models = res.data.map((i) => {
		return {
			...i,
			url: getUrlById(i.id)
		}
	})
	return models
}

async function sleep(ms = 1000) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
