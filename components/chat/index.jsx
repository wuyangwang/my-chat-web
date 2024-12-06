'use client'

import { ChatBottom } from './chat-bottombar'
import { ChatMessage } from './chat-message'
import { ChatMessageList } from './chat-message-list'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { useChat } from '@/hooks/useChat'
import { useModel } from '@/hooks/useModel'
import { useRef } from 'react'

export function Chat({ type }) {
	const { currentModel } = useModel()
	const { apiLoading, messages } = useChat(type)
	const chatRef = useRef()

	const onScroll = () => {
		chatRef.current.scrollTop = chatRef.current.scrollHeight
	}

	return (
		<div className='w-full h-[calc(100vh-64px)] relative max-w-screen-md mx-auto flex flex-col'>
			{/* <ChatTop /> */}
			<ChatMessageList ref={chatRef}>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
				{apiLoading && (
					<ChatMessage message={{ role: 'assistant', loading: true, content: '...' }} />
				)}
			</ChatMessageList>
			<ChatScroll onScroll={onScroll} />
			<ChatBottom type={type} />
		</div>
	)
}
