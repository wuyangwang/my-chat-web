import { Button } from '@/components/ui/button'
import { ChatInput } from './chat-input'
import { memo } from 'react'
import { useChat } from '@/hooks/useChat'

const ChatBottom = memo(({ type }) => {
	const { apiLoading, onInputChange, input, onSubmit } = useChat(type)
	const onKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			onSubmit()
		}
	}

	return (
		<div className='sticky w-full h-18 flex items-center py-4 px-3 border-t'>
			<ChatInput
				placeholder='请输入内容'
				value={input}
				disabled={apiLoading}
				onChange={(e) => onInputChange(e.target.value)}
				onKeyDown={onKeyDown}
			/>
			<Button disabled={apiLoading} className='ml-2' onClick={() => onSubmit()}>
				发送
			</Button>
		</div>
	)
})

ChatBottom.displayName = 'ChatBottom'
export { ChatBottom }
