'use client'

import { ChatRole, ChatTypeEnum } from '@/utils'
import { useEffect, useRef } from 'react'

import { ChatBottom } from './chat-bottombar'
import { ChatList } from './chat-list'
import { ChatMessage } from './chat-message'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { useChat } from '@/hooks/useChat'
import { useInitModel } from '@/hooks/useModel'
import { useListScroll } from '@/hooks/useListScroll'
import { useSidebarClose } from '@/hooks/useSidebarClose'
import { useUserStore } from '@/store'

export function Chat({ type }) {
	const isChat = type === ChatTypeEnum.chat
	const chatRef = useRef(null)

	useInitModel()
	useSidebarClose() // 确保进入页面 关闭侧边栏
	const { showScroll, onScroll, onScrollBottom } = useListScroll(chatRef)
	const nickName = useUserStore((state) => state.nickName)
	const { apiLoading, messages, onSubmit } = useChat(type)

	useEffect(() => {
		onScroll()
		// eslint-disable-next-line
	}, [messages])

	const onRegenerate = () => {
		if (apiLoading) return
		// 找到最新的是用户的聊天内容
		let text = messages.findLast((item) => item.role === ChatRole.User)?.content
		onSubmit(text)
	}

	return (
		<div className='w-full h-[calc(100vh-64px)] relative bg-background max-w-screen-md mx-auto flex flex-col z-10'>
			<ChatTop type={type} />
			<ChatList ref={chatRef}>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						message={{ ...message, nickName }}
						onRegenerate={onRegenerate}
					/>
				))}
				{/* 聊天是流式的 content是动态的 */}
				{apiLoading && !isChat && (
					<ChatMessage message={{ role: 'assistant', pending: true, content: '正在生成中...' }} />
				)}
			</ChatList>
			{showScroll && messages.length > 0 && <ChatScroll onScroll={onScrollBottom} />}
			<ChatBottom type={type} />
		</div>
	)
}
