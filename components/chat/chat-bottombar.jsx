import { Button } from '@/components/ui/button'
import { ChatInput } from './chat-input'
import { useChat } from '@/hooks/useChat'
import { useRef } from 'react'

export function ChatBottom({ type }) {
	const { apiLoading, onInputChange, text, onSubmit } = useChat(type)
	const chatRef = useRef()

	const onKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			onSubmit()
		}
	}

	return (
		<div className='sticky w-full h-16 flex items-center'>
			<ChatInput
				ref={chatRef}
				value={text}
				disabled={apiLoading}
				onChange={(e) => onInputChange(e.target.value)}
				onKeyDown={onKeyDown}
			/>
			<Button disabled={apiLoading} className='ml-2' onClick={onSubmit}>
				发送
			</Button>
		</div>
	)
}
