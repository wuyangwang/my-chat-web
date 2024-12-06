import { Button } from '@/components/ui/button'
import { ChatInput } from './chat-input'

export function ChatBottom({ apiLoading, onInputChange, text, onSubmit }) {
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
