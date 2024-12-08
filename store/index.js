import { ChatRole } from '@/utils'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useModelStore = create(
	persist(
		(set) => ({
			models: [],
			currentModel: null,
			currentTrans: '',
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
			setCurrentTrans: (currentTrans) => set({ currentTrans })
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
			addMessage: (message) =>
				set((state) => {
					let newMessages = [...state.messages, message]
					if (newMessages.length > 500) {
						newMessages.shift()
					}
					return { messages: newMessages }
				}),
			addMessageChunk: (msg) =>
				set((state) => {
					let isExist = false
					let messages = state.messages.map((i) => {
						if (i.id === msg.id) {
							i.content = i.content + ' ' + msg.content
							isExist = true
						}
						return i
					})
					if (isExist) {
						return { messages: messages }
					}

					let newMessages = [...messages, msg]
					if (newMessages.length > 500) {
						newMessages.shift()
					}
					return { messages: newMessages }
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
			clearImgMessages: () => set({ imgMessages: [] })
		}),
		{ name: 'chat-store' }
	)
)

export const useUserStore = create(
	persist(
		(set) => ({
			nickname: '',
			setNickname: (nickname) => set({ nickname })
		}),
		{ name: 'user-store' }
	)
)
