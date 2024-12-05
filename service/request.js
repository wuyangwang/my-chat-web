import { showToast } from '@/utils'

// const host = process.env.NEXT_PUBLIC_HOST

const statusMap = {
	200: '请求成功',
	401: '无权限',
	404: '请求不存在',
	500: '服务器错误'
}

export async function apiPost(url, data = {}, config = {}) {
	const res = await fetch(url, {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	})

	return await handleResponse(res, config)
}

export async function apiGet(url, data = {}, config = {}) {
	let urlParams = new URLSearchParams(data).toString()
	const res = await fetch(url + '?' + urlParams)

	return await handleResponse(res, config)
}

async function handleResponse(data, config = {}) {
	if (!data.ok) {
		let message = statusMap[data.status] || '请求失败'
		showToast(message || msg, 'error')
		throw new Error(message || msg)
	}

	// await sleep(5000)
	if (config.isImage) {
		let blob = await data.blob() // 解析为 Blob 数据
		return URL.createObjectURL(blob)
	}
	if (config.isFile) {
		return await data.blob()
	}
	if (config.isText) {
		return await data.text()
	}
	if (config.isBinary) {
		return await data.arrayBuffer()
	}

	let res = await data.json()
	if (res.code !== 200) {
		showToast(res.message || '请求失败', 'error')
		throw new Error(res.message)
	}

	return res.data
}

async function sleep(ms = 1000) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
