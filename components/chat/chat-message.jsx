import { BotMessageSquare } from 'lucide-react'
import { ChatRole } from '@/utils'
import Image from 'next/image'
import { Loader } from 'lucide-react'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const ChatMessage = memo(({ message }) => {
	const { role, loading, content, timestamp, isImage } = message

	const isUser = role === ChatRole.User
	const roleName = isUser ? 'self-end flex-row-reverse text-right' : 'self-start'
	const timeStr = timestamp ? new Date(timestamp).toLocaleString() : ''

	return (
		<div className='flex flex-col gap-2 mb-3'>
			<div className={cn('flex items-center gap-2', roleName)}>
				<div className='text-primary'>
					{!isUser && <BotMessageSquare />}
					{isUser && <User />}
				</div>
				<div className='text-muted-foreground text-sm'>{timeStr}</div>
			</div>
			<div
				className={cn(
					'p-4 bg-accent text-foreground rounded-lg max-w-[60%] cursor-pointer',
					roleName
				)}
			>
				{isImage && <Image src={content} alt='image' unoptimized width={350} height={350} />}
				{!isImage && (
					<pre className='text-wrap text-xs md:text-sm'>
						{loading && <Loader className='animate-spin' />}
						{content}
					</pre>
				)}
			</div>
		</div>
	)
})

ChatMessage.displayName = 'ChatMessage'
export { ChatMessage }
