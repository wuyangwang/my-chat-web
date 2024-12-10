import { showToast } from '@/utils'

// local ollama测试
const ollamaUrl = process.env.NEXT_PUBLIC_LOCAL_API_HOST
// const respContentType = 'application/x-ndjson'

export async function postOllamaChat(data) {
	const { models } = await getOllamaModels()
	let model = models[0].name

	const res = await fetch(ollamaUrl + '/api/chat', {
		body: JSON.stringify({ ...data, model, stream: true }),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	})
	if (!res.ok) {
		let { error } = await res.body.json()
		let msg = error || '请求ollama失败'
		showToast(msg, 'error')
		throw new Error(msg)
	}
	return res.body
}
async function getOllamaModels() {
	const res = await fetch(ollamaUrl + '/api/tags')
	return await res.json()
}

export const streamReaderOllama = async (stream, cb) => {
	const reader = stream.getReader()
	const decoder = new TextDecoder('utf-8')
	let buffer = ''

	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		buffer += decoder.decode(value, { stream: true })

		// 按行分割数据
		let lines = buffer.split('\n')
		buffer = lines.pop() // 剩下未完成的部分保留

		for (const line of lines) {
			if (line.trim()) {
				try {
					const parsed = JSON.parse(line)
					// console.log("🚀 ~ streamReaderOllama ~ parsed:", parsed)
					cb(parsed.message.content, parsed.done)
				} catch (err) {
					cb('', true)
				}
			}
		}
	}

	// 处理剩余未完成的部分
	if (buffer.trim()) {
		try {
			const parsed = JSON.parse(buffer)
			cb(parsed.message.content, parsed.done)
		} catch (err) {
			cb('', true)
		}
	}
}
