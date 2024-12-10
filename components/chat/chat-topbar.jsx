import { AlertModal } from '@/components/common/AlertModal'
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

			<AlertModal
				title='确认操作'
				desc='确定要清空本地保存的所有记录吗，无法恢复！'
				onConfirm={onClear}
			>
				<Trash2 className='cursor-pointer h4 w-4 text-primary hover:text-primary/80' />
			</AlertModal>
		</div>
	)
})

ChatTop.displayName = 'ChatTop'
export { ChatTop }
