import { showToast } from '@/utils'

const host = process.env.NEXT_PUBLIC_HOST

export async function getModels(tag) {
	const data = await fetch(`/api/models?tag=${tag}`)
	const res = await data.json()
	// await sleep(5000)
	if (res.code !== 200) {
		showToast('获取模型失败', 'error')
		return []
	}
	return res.data
}

async function sleep(ms = 1000) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
