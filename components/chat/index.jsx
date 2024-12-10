'use client'

import { useEffect, useRef } from 'react'

import { ChatBottom } from './chat-bottombar'
import { ChatList } from './chat-list'
import { ChatMessage } from './chat-message'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { ChatTypeEnum } from '@/utils'
import { useChat } from '@/hooks/useChat'
import { useListScroll } from '@/hooks/useListScroll'
import { useSidebarClose } from '@/hooks/useSidebarClose'

export function Chat({ type }) {
	const isChat = type === ChatTypeEnum.chat
	const chatRef = useRef(null)

	useSidebarClose()
	const { onScroll, showScroll } = useListScroll(chatRef)
	const { apiLoading, messages, ...props } = useChat(type)

	useEffect(() => {
		onScroll()
	}, [messages, onScroll])

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
			{showScroll && <ChatScroll onScroll={onScroll} />}
			<ChatBottom apiLoading={apiLoading} {...props} />
		</div>
	)
}
