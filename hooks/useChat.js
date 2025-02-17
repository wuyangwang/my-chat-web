import {
	ChatTypeEnum,
	ModelTypeEnum,
	genAssistantMessage,
	genChatPostParams,
	genUserMessage,
	mockApi,
	showToast
} from '@/utils'
import { chatWithMock, genImageWithApi, getChatApi, transWithApi } from '@/service'
import { useChatStatusStore, useChatStore, useModelStore } from '@/store'

import queue from '@/utils/queue'
import { useCurrentModel } from '@/hooks/useModel'
import { useState } from 'react'

export function useChat(type) {
	const [input, setInput] = useState('')

	const currentModel = useCurrentModel()
	const currentModelInfo = useModelStore((state) => state.currentModelInfo)
	const currentTransTarget = currentModelInfo.transTarget

	const ollamaModelInfo = useModelStore((s) => s.ollamaModelInfo)
	const ollamaModel = ollamaModelInfo()?.model

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
		if (!currentModel) return showToast('请先选择模型')
		let text = content || input
		if (!text) return showToast('请输入内容')
		let maxCount = currentModel.maxCount || 1000
		if (text.length > maxCount) return showToast('不能超过' + maxCount + '文字')

		let fModel = currentModel.type === ModelTypeEnum.ollama ? ollamaModel : currentModel.model
		if (!fModel) return showToast('请先选择模型')

		let msg = genUserMessage(text, fModel)
		let chatApi
		let params

		if (type === ChatTypeEnum.chat) {
			addMessage(msg)
			chatApi = getChatApi(currentModel.type)
			params = genChatPostParams(msg, messages, fModel)
		} else if (type === ChatTypeEnum.translate) {
			addTransMessage(msg)
			let [source, target] = currentTransTarget.split('-')
			chatApi = transWithApi
			params = { text, source, target }
		} else if (type === ChatTypeEnum.genImage) {
			addImgMessage(msg)
			chatApi = genImageWithApi
			params = { prompt: text, model: fModel }
		}

		if (mockApi) {
			chatApi = chatWithMock
		}
		setApiLoading(true)
		try {
			if (type === ChatTypeEnum.chat) {
				let msg = genAssistantMessage('', fModel)
				addMessageChunk(msg) // 先插入一条空消息
				if (mockApi) {
					const data = await chatApi(params)
					addMessageChunk({ ...msg, content: data.text })
					addMessageChunk({ ...msg, content: '[DONE]' })
				} else {
					await chatApi(
						params,
						queue.startQueue((text) => {
							addMessageChunk({ ...msg, content: text })
						})
					)
				}
			} else if (type === ChatTypeEnum.translate) {
				const data = await chatApi(params)
				addTransMessage(genAssistantMessage(data.text, fModel))
			} else if (type === ChatTypeEnum.genImage) {
				const data = await chatApi(params, preTrans)
				addImgMessage(genAssistantMessage(data.url, fModel))
			}

			setInput('')
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
