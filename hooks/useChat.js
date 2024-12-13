import {
	ChatTypeEnum,
	genAssistantMessage,
	genChatPostParams,
	genUserMessage,
	isDev,
	showToast,
	streamReader
} from '@/utils'
import { enableOllama, postOllamaChat, streamReaderOllama } from '@/service/ollama'
import { getImage, getTranslate, mock, postChat } from '@/service'
import { useChatStatusStore, useChatStore, useModelStore } from '@/store'

import { useState } from 'react'

export function useChat(type) {
	const [input, setInput] = useState('')

	const currentTrans = useModelStore((s) => s.currentTrans)
	const currentModel = useModelStore((s) => s.currentModel)

	const apiLoading = useChatStatusStore((s) => s.apiLoading)
	const setApiLoading = useChatStatusStore((s) => s.setApiLoading)

	const messages = useChatStore((s) => s.messages)
	const transMessages = useChatStore((s) => s.transMessages)
	const imgMessages = useChatStore((s) => s.imgMessages)
	const preTrans = useChatStore((s) => s.preTrans)
	const addMessage = useChatStore((s) => s.addMessage)
	const addMessageChunk = useChatStore((s) => s.addMessageChunk)
	const addTransMessage = useChatStore((s) => s.addTransMessage)
	const addImgMessage = useChatStore((s) => s.addImgMessage)
	const clearMessages = useChatStore((s) => s.clearMessages)
	const clearTransMessages = useChatStore((s) => s.clearTransMessages)
	const clearImgMessages = useChatStore((s) => s.clearImgMessages)
	const setPreTrans = useChatStore((s) => s.setPreTrans)

	const onInputChange = (v) => {
		setInput(v)
	}

	const onSubmit = async (content) => {
		let text = content || input
		if (!text) return showToast('请输入内容')

		let msg = genUserMessage(text, currentModel.model)
		let chatApi
		let params

		if (type === ChatTypeEnum.chat) {
			addMessage(msg)
			chatApi = postChat
			params = genChatPostParams(msg, messages, currentModel.model)
		} else if (type === ChatTypeEnum.translate) {
			addTransMessage(msg)
			let [source, target] = currentTrans.split('-')
			chatApi = getTranslate
			params = { text, source, target }
		} else if (type === ChatTypeEnum.genImage) {
			addImgMessage(msg)
			chatApi = getImage
			params = { prompt: text, model: currentModel.model }
		} else {
			//
		}

		if (isDev) {
			chatApi = type === ChatTypeEnum.chat && enableOllama ? postOllamaChat : mock
		}
		try {
			setApiLoading(true)
			if (type === ChatTypeEnum.genImage && !isDev && preTrans) {
				// 先翻译为英文
				const transData = await getTranslate({ text })
				params.prompt = transData.text
			}

			const data = await chatApi(params)
			setInput('')

			if (type === ChatTypeEnum.chat) {
				if (isDev) {
					if (enableOllama) {
						let msg = genAssistantMessage('', currentModel.model)
						addMessageChunk(msg) // 先插入一条空消息
						await streamReaderOllama(data, (text, done) => {
							addMessageChunk({ ...msg, content: done ? '[DONE]' : text }) // 兼容
						})
					} else {
						addMessage(genAssistantMessage(data.text, currentModel.model))
					}
				} else {
					let msg = genAssistantMessage('', currentModel.model)
					addMessageChunk(msg) // 先插入一条空消息
					await streamReader(data, (text) => {
						addMessageChunk({ ...msg, content: text })
					})
				}
			} else if (type === ChatTypeEnum.translate) {
				addTransMessage(genAssistantMessage(data.text, currentModel.model))
			} else if (type === ChatTypeEnum.genImage) {
				addImgMessage(genAssistantMessage(data.url, currentModel.model))
			} else {
				//
			}
		} finally {
			setApiLoading(false)
		}
	}

	const onClear = () => {
		if (type === ChatTypeEnum.chat) {
			clearMessages()
		} else if (type === ChatTypeEnum.genImage) {
			clearImgMessages()
		} else {
			clearTransMessages()
		}
		showToast('清除成功')
	}

	return {
		apiLoading,
		onInputChange,
		onSubmit,
		onClear,
		input,
		preTrans,
		setPreTrans,
		messages:
			type === ChatTypeEnum.translate
				? transMessages
				: type === ChatTypeEnum.genImage
				? imgMessages
				: messages
	}
}
