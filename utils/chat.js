import { nanoid } from 'nanoid'

// 聊天角色
export const ChatRole = {
	User: 'user',
	System: 'system',
	Assistant: 'assistant'
}

export const genUserMessage = (content) => {
	return {
		role: ChatRole.User,
		content
	}
}
export const genAssistantMessage = (content) => {
	return {
		role: ChatRole.Assistant,
		content
	}
}

export const genId = () => {
	return nanoid()
}
