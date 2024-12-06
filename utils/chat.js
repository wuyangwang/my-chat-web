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
