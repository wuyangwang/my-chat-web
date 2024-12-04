import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChatStore = create(
	persist(
		(set) => ({
			models: [],
			messages: [],
			currentModel: null,
			setModels: (models) => set({ models }),
			setMessages: (messages) => set({ messages }),
			setCurrentModel: (currentModel) => set({ currentModel })
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
