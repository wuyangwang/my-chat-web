import { showToast } from '@/utils'

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

	const contentType = data.headers.get('Content-Type')
	const isJson = contentType.includes('application/json') // 判断是否为 JSON 数据 主要是错误响应是json格式
	// await sleep(5000)
	if (config.isImage && !isJson) {
		let blob = await data.blob() // 解析为 Blob 数据
		let base64 = await blobToBase64(blob)
		return { url: base64 }
		// return { url: URL.createObjectURL(blob) }
	}
	if (config.isStream && !isJson) {
		return data.body
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

async function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result) // 获取 Base64 部分
		reader.onerror = (err) => reject(err)
		reader.readAsDataURL(blob) // 读取 Blob 为 Data URL
	})
}
