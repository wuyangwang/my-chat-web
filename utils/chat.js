import { createParser } from 'eventsource-parser'
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
	const arr = messagesToSend.concat(msg).map((i) => ({ role: i.role, content: i.content }))
	return { messages: arr, model }
}

export const genId = () => {
	return nanoid()
}

export const streamReader = async (stream, cb) => {
	const reader = stream.getReader()
	const decoder = new TextDecoder()

	const parser = createParser({ onEvent })
	function onEvent(event) {
		if (event.event === undefined || event.event === 'message') {
			const text = event.data.trim()
			if (text === '[DONE]') {
				cb(text) // 流结束时的标识
			} else {
				cb(JSON.parse(text).response)
			}
		}
	}

	let buffer = ''
	while (true) {
		const { done, value } = await reader.read()
		if (done) break

		buffer += decoder.decode(value, { stream: true })
		parser.feed(buffer)
	}
}
