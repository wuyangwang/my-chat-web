import { ChatRole, setOllamaHost } from '@/utils'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useModelStore = create(
	persist(
		(set) => ({
			models: [],
			currentModel: null,
			currentTrans: '',
			ollamaModel: '', // 选择的ollama模型
			ollamaApiHost: 'http://localhost:11434', // 默认
			grokApiKey: '',
			geminiApiKey: '',
			openaiApiKey: '',
			setModels: (models) => set({ models }),
			setCurrentModel: (currentModel) =>
				set((state) => {
					if (currentModel.items && !state.currentTrans) {
						let info = currentModel.items[0]
						return {
							currentModel,
							currentTrans: `${info.source}-${info.target}`
						}
					}
					return { currentModel }
				}),
			setCurrentTrans: (currentTrans) => set({ currentTrans }),
			setOllamaModel: (ollamaModel) => set({ ollamaModel }),
			setOllamaApiHost: (ollamaApiHost) => set({ ollamaApiHost }),
			setGrokApiKey: (grokApiKey) => set({ grokApiKey }),
			setGeminiApiKey: (geminiApiKey) => set({ geminiApiKey }),
			setOpenAiApiKey: (openAiApiKey) => set({ openAiApiKey })
		}),
		{ name: 'model-store' }
	)
)

export const useChatStore = create(
	persist(
		(set) => ({
			// 最大保存500条
			messages: [],
			// 最大保存500条
			transMessages: [],
			// 保存最新的50条
			imgMessages: [],
			preTrans: false,
			addMessage: (message) =>
				set((state) => {
					let newMessages = state.messages.concat(message)
					if (newMessages.length > 500) {
						newMessages.shift()
					}
					return { messages: newMessages }
				}),
			addMessageChunk: (message) =>
				set((state) => {
					let msg = state.messages.filter((item) => item.id == message.id)[0]
					if (!msg) {
						let newMessages = state.messages.concat({ ...message, pending: true })
						if (newMessages.length > 500) {
							newMessages.shift()
						}
						return { messages: newMessages }
					}
					//标识
					let text = msg.content + message.content
					const isDone = message.content.endsWith('[DONE]')
					message.pending = !isDone

					let newMsg = {
						...msg,
						...message,
						content: isDone ? text.replace('[DONE]', '') : text
					}
					let msgArr = state.messages.filter((item) => item.id !== message.id)
					return { messages: msgArr.concat(newMsg) }
				}),
			addTransMessage: (message) =>
				set((state) => {
					let newMessages = [...state.transMessages, message]
					if (newMessages.length > 500) {
						newMessages.shift()
					}
					return { transMessages: newMessages }
				}),
			addImgMessage: (message) =>
				set((state) => {
					let newMessages = [
						...state.imgMessages,
						{ ...message, isImage: message.role === ChatRole.Assistant }
					]
					if (newMessages.length > 50) {
						newMessages.shift()
					}
					return { imgMessages: newMessages }
				}),
			clearMessages: () => set({ messages: [] }),
			clearTransMessages: () => set({ transMessages: [] }),
			clearImgMessages: () => set({ imgMessages: [] }),
			setPreTrans: (preTrans) => set({ preTrans })
		}),
		{
			name: 'chat-store'
		}
	)
)

// 不需要存到localstorage，单独抽出
export const useChatStatusStore = create((set) => ({
	apiLoading: false,
	setApiLoading: (apiLoading) => set({ apiLoading })
}))

export const useUserStore = create(
	persist(
		(set) => ({
			nickName: '',
			setNickname: (nickName) => set({ nickName })
		}),
		{ name: 'user-store' }
	)
)
