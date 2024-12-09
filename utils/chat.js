import { nanoid } from 'nanoid'

export const ChatTypeEnum = {
	chat: 1,
	genImage: 2,
	translate: 3
}

// 聊天角色
export const ChatRole = {
	User: 'user',
	System: 'system',
	Assistant: 'assistant'
}

export const genUserMessage = (content, model = '') => {
	return {
		id: genId(),
		timestamp: Date.now(),
		role: ChatRole.User,
		content,
		model
	}
}
export const genAssistantMessage = (content, model = '') => {
	return {
		id: genId(),
		timestamp: Date.now(),
		role: ChatRole.Assistant,
		content,
		model
		// pending: true
	}
}

export const genChatPostParams = (msg, messages, model = '') => {
	// 获取最新的4条消息
	const messagesToSend = messages.slice(-4)
	return { messages: messagesToSend.concat(msg), model }
}

export const genId = () => {
	return nanoid()
}

export const streamReader = async (stream, cb) => {
	const reader = stream.getReader()
	let done = false

	while (!done) {
		const { value, done: isDone } = await reader.read()
		done = isDone
		if (value) {
			let text = parseText(value)
			cb(text)
		}
	}
	cb('') // 流结束时的回调
}

function parseText(value) {
	let input = new TextDecoder().decode(value)
	const lines = input.split('\n')
	let arr = []
	lines.forEach((line) => {
		let str = line.replace(/data: /g, '')
		str = str.replace('[DONE]', '').trim()
		if (str) {
			arr.push(JSON.parse(str).response)
		} else {
			arr.push('')
		}
	})
	return arr.join('')
}
