import { ChatTypeEnum, genAssistantMessage, genUserMessage, showToast } from '@/utils'
import { getChat, getImage, getTranslate, mock } from '@/service'
import { useChatStore, useModelStore } from '@/store'

import { useState } from 'react'

export function useChat(type) {
	const [apiLoading, setApiLoading] = useState(false)
	const [text, setText] = useState('')

	const currentTrans = useModelStore((s) => s.currentTrans)

	const messages = useChatStore((s) => s.messages)
	const transMessages = useChatStore((s) => s.transMessages)
	const imgMessages = useChatStore((s) => s.imgMessages)
	const addMessage = useChatStore((s) => s.addMessage)
	const addTransMessage = useChatStore((s) => s.addTransMessage)
	const addImgMessage = useChatStore((s) => s.addImgMessage)

	const onInputChange = (v) => {
		setText(v)
	}

	const onSubmit = async () => {
		if (!text) return showToast('请输入内容')
		let msg = genUserMessage(text)
		let apiPost
		if (type === ChatTypeEnum.chat) {
			addMessage(msg)
			apiPost = getChat(text)
		} else if (type === ChatTypeEnum.translate) {
			addTransMessage(msg)
			let [source, target] = currentTrans.split('-')
			apiPost = getTranslate({ text, source, target })
		} else if (type === ChatTypeEnum.genImage) {
			addImgMessage(msg)
			apiPost = getImage(text)
		} else {
			//
		}

		try {
			setApiLoading(true)
			const data = await apiPost()
			// const data = await mock()
			setText('')

			if (type === ChatTypeEnum.chat) {
				addMessage(genAssistantMessage(data.text))
			} else if (type === ChatTypeEnum.translate) {
				addTransMessage(genAssistantMessage(data.text))
			} else if (type === ChatTypeEnum.genImage) {
				addImgMessage(genAssistantMessage(data.url))
			} else {
				//
			}
		} finally {
			setApiLoading(false)
		}
	}

	return {
		apiLoading,
		onInputChange,
		onSubmit,
		text,
		messages:
			type === ChatTypeEnum.translate
				? transMessages
				: type === ChatTypeEnum.genImage
				? imgMessages
				: messages
	}
}
