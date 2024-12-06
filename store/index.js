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
					let trans = currentModel.items && currentModel.items[0]
					return {
						currentModel,
						currentTrans: state.currentTrans || `${trans.source}-${trans.target}`
					}
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
			// 保存最新的5条
			imgMessages: [],
			addMessage: (message) =>
				set((state) => {
					let newMessages = [...state.messages, message]
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
					let newMessages = [...state.imgMessages, message]
					if (newMessages.length > 5) {
						newMessages.shift()
					}
					return { imgMessages: newMessages }
				})
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
