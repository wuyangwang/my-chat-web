'use client'

import { useEffect, useRef } from 'react'

import { ChatBottom } from './chat-bottombar'
import { ChatList } from './chat-list'
import { ChatMessage } from './chat-message'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { ChatTypeEnum } from '@/utils'
import { useChat } from '@/hooks/useChat'

export function Chat({ type }) {
	const chatRef = useRef(null)
	const { apiLoading, messages, ...props } = useChat(type)
	const isChat = type === ChatTypeEnum.chat

	const onScroll = () => {
		if (chatRef) {
			chatRef.current.scrollTo({
				top: chatRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}

	useEffect(() => {
		onScroll()
	}, [messages])

	return (
		<div className='w-full h-[calc(100vh-64px)] relative max-w-screen-md mx-auto flex flex-col z-10'>
			<ChatTop type={type} onClear={props.onClear} />
			<ChatList ref={chatRef}>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
				{apiLoading && !isChat && (
					<ChatMessage message={{ role: 'assistant', loading: true, content: '正在生成中...' }} />
				)}
			</ChatList>
			<ChatScroll onScroll={onScroll} />
			<ChatBottom apiLoading={apiLoading} {...props} />
		</div>
	)
}
