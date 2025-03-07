import { ChatRole, ModelTypeEnum, RouterEnum, mapPathToKey } from '@/utils'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useModelStore = create(
	persist(
		(set, get) => ({
			// 所有的内部模型 {chat:[],xxx}
			models: {},
			// 当前模型信息 包括 翻译、聊天、图片等各自的模型信息
			currentModelInfo: {},
			// 第三方model信息 比如key
			// 比如openai:{apiKey:'',apiHost:'',currentModel:'',models:[]}
			thirdModelInfo: {
				[ModelTypeEnum.ollama]: {
					apiKey: '',
					apiHost: 'http://localhost:11434', // 默认
					model: '', // 当前选择的model
					models: []
				}
			},
			//根据类型获取第三方model key
			thirdModelKey: (type) => {
				const { thirdModelInfo } = get()
				return (thirdModelInfo[type] || {}).apiKey
			},
			// 特别 获取ollama模型信息
			ollamaModelInfo: () => {
				const { thirdModelInfo } = get()
				return thirdModelInfo[ModelTypeEnum.ollama] || {}
			},
			setModels: (models, path) =>
				set((state) => {
					let key = mapPathToKey(path)

					if (!state.currentModelInfo[key]) {
						state.setCurrentModelInfo(models[0], path)
					}
					return {
						models: {
							...state.models,
							[key]: models
						}
					}
				}),
			// 设置当前模型信息
			setCurrentModelInfo: (model, path) =>
				set((state) => {
					let key = mapPathToKey(path)
					let info = { ...state.currentModelInfo, [key]: model }
					// 翻译
					if (path === RouterEnum.trans) {
						let item = model.items[0] // 默认取第一个
						info.transTarget = `${item.source}-${item.target}`
					}
					return {
						currentModelInfo: info
					}
				}),
			// 设置当前翻译model的target
			setCurrentTransTarget: (transTarget) =>
				set((state) => ({
					currentModelInfo: { ...state.currentModelInfo, transTarget: transTarget }
				})),
			// 设置第三方model信息
			setThirdModelInfo: (type, info) =>
				set((state) => {
					let current = state.thirdModelInfo[type] || {}
					let newInfo = { ...state.thirdModelInfo, [type]: { ...current, ...info } }

					const isOllama = type === ModelTypeEnum.ollama
					if (isOllama) {
						//
					}
					return {
						thirdModelInfo: {
							...state.thirdModelInfo,
							[type]: newInfo
						}
					}
				}),
			// 设置第三方model key
			setThirdModelKeys: (arr) =>
				set((state) => {
					let info = state.thirdModelInfo
					arr.forEach((i) => {
						const { type, key } = i
						let current = state.thirdModelInfo[type] || {}
						current.apiKey = key
						info[type] = current
					})

					return {
						thirdModelInfo: info
					}
				})
		}),
		{ name: 'model-store', version: 1 }
	)
)

export const useChatStore = create(
	persist(
		(set) => ({
			// 最大保存500条
			messages: [],
			// 最大保存500条
			transMessages: [],
			// 保存最新的100条
			imgMessages: [],
			preTrans: true,
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
					if (newMessages.length > 100) {
						newMessages.shift()
					}
					return { imgMessages: newMessages }
				}),
			clearMessages: () => set({ messages: [] }),
			clearTransMessages: () => set({ transMessages: [] }),
			clearImgMessages: () => set({ imgMessages: [] }),
			setPreTrans: (preTrans) => set({ preTrans })
		}),
		{ name: 'chat-store', version: 1 }
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
		{ name: 'user-store', version: 0 }
	)
)
