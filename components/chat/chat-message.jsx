import { BotMessageSquare } from 'lucide-react'
import { ChatRole } from '@/utils'
import { Loader } from 'lucide-react'
import { User } from 'lucide-react'
import { memo } from 'react'

const ChatMessage = memo(({ message }) => {
	const { role, loading, content } = message
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				<div className='w-[30px] h-[30px] rounded-full bg-gray-500'></div>
				<div className='text-primary'>
					{role === ChatRole.Assistant && <BotMessageSquare />}
					{role === ChatRole.User && <User />}
				</div>
			</div>
			<div className='p-4 bg-gray-100 rounded-lg'>
				<pre className='whitespace-pre-wrap'>
					{loading && <Loader className='animate-spin' />}
					{content}
				</pre>
			</div>
		</div>
	)
})

ChatMessage.displayName = 'ChatMessage'
export { ChatMessage }
