import { ChatBottom } from './chat-bottombar'
import { ChatMessage } from './chat-message'
import { ChatMessageList } from './chat-message-list'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { useChat } from '@/hooks/useChat'

export function Chat({ type }) {
	const { apiLoading, messages, onSubmit, onInputChange } = useChat(type)

	return (
		<div className='w-full h-full relative max-w-screen-md mx-auto flex flex-col'>
			<ChatTop />
			<ChatScroll />
			<ChatMessageList>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
			</ChatMessageList>
			<ChatBottom type={type} />
		</div>
	)
}
