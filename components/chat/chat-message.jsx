import { BotMessageSquare, Loader, User } from 'lucide-react'

import { ChatRole } from '@/utils'
import { CopyContent } from '@/components/common/CopyContent'
import { ImagePreview } from '@/components/common/ImagePreview'
import { MarkdownPreview } from '@/components/common/MarkdownPreview'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const ChatMessage = memo(({ message }) => {
	const { role, pending, content, timestamp, isImage, nickName } = message

	const isUser = role === ChatRole.User
	const roleName = isUser ? 'self-end flex-row-reverse text-right' : 'self-start'
	const timeStr = timestamp ? new Date(timestamp).toLocaleString() : ''

	return (
		<div className='flex flex-col gap-2 mb-3'>
			<div className={cn('flex items-center gap-2 group', roleName)}>
				<div className='text-primary flex items-center gap-1'>
					{!isUser && <BotMessageSquare />}
					{isUser && (
						<>
							<span className='text-muted-foreground text-sm'>{nickName}</span>
							<User />
						</>
					)}
				</div>
				<div className='hidden group-hover:block text-muted-foreground text-sm'>{timeStr}</div>
			</div>
			<div
				className={cn(
					'p-4 bg-accent text-foreground rounded-lg max-w-[90%] md:max-w-[70%] relative group',
					roleName
				)}
			>
				{isImage && <ImagePreview src={content} />}
				{!isImage && (
					<>
						<div className='text-wrap text-xs md:text-sm break-words whitespace-pre-wrap'>
							{pending && <Loader className='animate-spin' />}

							<MarkdownPreview content={content} />
						</div>
						<CopyContent
							content={content}
							className='hidden group-hover:block right-1 bottom-0 cursor-pointer'
						/>
					</>
				)}
			</div>
		</div>
	)
})

ChatMessage.displayName = 'ChatMessage'
export { ChatMessage }
