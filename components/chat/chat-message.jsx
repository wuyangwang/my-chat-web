import { BotMessageSquare, Loader, User } from 'lucide-react'
import { ChatRole, downloadImg } from '@/utils'

import { CopyContent } from '@/components/common/CopyContent'
import { Download } from 'lucide-react'
import { IconWrap } from '../common/IconWrap'
import { ImagePreview } from '@/components/common/ImagePreview'
import { MarkdownPreview } from '@/components/common/MarkdownPreview'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const ChatMessage = memo(({ message, onRegenerate }) => {
	const { role, pending, content, timestamp, isImage, nickName } = message

	const isUser = role === ChatRole.User
	const roleName = isUser ? 'self-end flex-row-reverse' : 'self-start'
	const timeStr = timestamp ? new Date(timestamp).toLocaleString() : ''

	const onDownload = () => {
		downloadImg(content)
	}

	return (
		<div className='flex flex-col gap-2 mb-5'>
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
			<div className={cn('max-w-[90%] md:max-w-[70%] relative group', roleName)}>
				<div className='p-4 bg-accent text-foreground rounded-lg mb-2'>
					{isImage && <ImagePreview src={content} />}
					{!isImage && (
						<div className='text-wrap text-xs md:text-sm break-words whitespace-pre-wrap'>
							{pending && <Loader className='animate-spin' />}

							<MarkdownPreview content={content} />
						</div>
					)}
				</div>
				<div className={cn('flex items-center gap-2', isUser && 'justify-end')}>
					{isImage && !pending && <IconWrap Icon={Download} title='下载' onClick={onDownload} />}
					{!isImage && !pending && (
						<div title='复制内容'>
							<CopyContent content={content} className='block cursor-pointer' />
						</div>
					)}
					{!isUser && <IconWrap Icon={RefreshCw} title='重新生成' onClick={onRegenerate} />}
				</div>
			</div>
		</div>
	)
})

ChatMessage.displayName = 'ChatMessage'
export { ChatMessage }
