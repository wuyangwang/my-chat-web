import { nanoid } from 'nanoid'

// 聊天角色
export const ChatRole = {
	User: 'user',
	System: 'system',
	Assistant: 'assistant'
}

export const genUserMessage = (content) => {
	return {
		id: genId(),
		timestamp: Date.now(),
		role: ChatRole.User,
		content
	}
}
export const genAssistantMessage = (content) => {
	return {
		id: genId(),
		timestamp: Date.now(),
		role: ChatRole.Assistant,
		content
	}
}

export const genId = () => {
	return nanoid()
}
