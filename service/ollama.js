import { genSystemMessage, getOllamaHost, showToast } from '@/utils'

export async function chatWithOllama({ model, messages }, onCb) {
	const res = await fetch(getOllamaHost() + '/api/chat', {
		body: JSON.stringify({ messages: genSystemMessage().concat(messages), model, stream: true }),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	})
	if (!res.ok) {
		let { error } = await res.body.json()
		let msg = error || '请求Ollama失败'
		showToast(msg, 'error')
		throw new Error(msg)
	}

	for await (const [text, done] of streamReaderOllama(res.body)) {
		onCb(text)
	}
	onCb('[DONE]') // 兼容格式
}

export async function getOllamaModels() {
	const res = await fetch(getOllamaHost() + '/api/tags')
	const { models } = await res.json()
	return models
}

export async function* streamReaderOllama(stream) {
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
					yield [parsed.message.content, parsed.done]
				} catch (err) {
					yield ['', true]
				}
			}
		}
	}

	// 处理剩余未完成的部分
	if (buffer.trim()) {
		try {
			const parsed = JSON.parse(buffer)
			yield [parsed.message.content, parsed.done]
		} catch (err) {
			yield ['', true]
		}
	}
}
