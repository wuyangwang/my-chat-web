import {
	ChatTypeEnum,
	genAssistantMessage,
	genChatPostParams,
	genUserMessage,
	showToast,
	streamReader
} from '@/utils'
import { getChat, getImage, getTranslate, mock } from '@/service'
import { useChatStore, useModelStore } from '@/store'

import { useModel } from './useModel'
import { useState } from 'react'

export function useChat(type) {
	useModel()

	const [apiLoading, setApiLoading] = useState(false)
	const [text, setText] = useState('')

	const currentTrans = useModelStore((s) => s.currentTrans)
	const currentModel = useModelStore((s) => s.currentModel)

	const messages = useChatStore((s) => s.messages)
	const transMessages = useChatStore((s) => s.transMessages)
	const imgMessages = useChatStore((s) => s.imgMessages)
	const addMessage = useChatStore((s) => s.addMessage)
	const addMessageChunk = useChatStore((s) => s.addMessageChunk)
	const addTransMessage = useChatStore((s) => s.addTransMessage)
	const addImgMessage = useChatStore((s) => s.addImgMessage)
	const clearMessages = useChatStore((s) => s.clearMessages)
	const clearTransMessages = useChatStore((s) => s.clearTransMessages)
	const clearImgMessages = useChatStore((s) => s.clearImgMessages)

	const onInputChange = (v) => {
		setText(v)
	}

	const onSubmit = async () => {
		if (!text) return showToast('请输入内容')

		let msg = genUserMessage(text, currentModel.model)
		let chatApi
		let params

		if (type === ChatTypeEnum.chat) {
			addMessage(msg)
			chatApi = getChat
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

		try {
			setApiLoading(true)
			if (type === ChatTypeEnum.genImage) {
				// 先翻译为英文
				const transData = await getTranslate({ text })
				params.prompt = transData.text
			}
			const data = await chatApi(params)
			// const data = await mock()
			setText('')

			if (type === ChatTypeEnum.chat) {
				let msg = genAssistantMessage('', currentModel.model)
				addMessageChunk({ ...msg, pending: true }) // 先插入一条空消息
				await streamReader(data, (text) => {
					addMessageChunk({ ...msg, content: text, pending: !!text })
				})
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
	}

	return {
		apiLoading,
		onInputChange,
		onSubmit,
		onClear,
		text,
		messages:
			type === ChatTypeEnum.translate
				? transMessages
				: type === ChatTypeEnum.genImage
				? imgMessages
				: messages
	}
}
