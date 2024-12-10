import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { ChatTypeEnum } from '@/utils'
import { CircleAlert } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { memo } from 'react'
import { useChat } from '@/hooks/useChat'

const ChatTop = memo(({ type }) => {
	const { onClear } = useChat(type)
	return (
		<div className='p-1 px-2 flex items-center gap-3'>
			<div className='text-xs text-muted-foreground flex items-center gap-2'>
				<CircleAlert className='text-primary/80 h-4 w-4' />
				{type === ChatTypeEnum.chat && '选择模型，进行聊天，最多保存500条历史记录'}
				{type === ChatTypeEnum.genImage && '选择模型，进行图片生成，最多保存50条历史记录'}
				{type === ChatTypeEnum.translate && '选择翻译模式，进行文本翻译，最多保存500条历史记录'}
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Trash2
							className='cursor-pointer h4 w-4 text-primary hover:text-primary/80'
							onClick={onClear}
						/>
					</TooltipTrigger>
					<TooltipContent>
						<p>清空当前内容，注意会清空所有历史记录</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
})

ChatTop.displayName = 'ChatTop'
export { ChatTop }
