'use client'

import { useChatStore } from '@/store'
import useIsMobile from '@/hooks/useIsMobile'

export function ModelInfo() {
	const isMobile = useIsMobile()
	const currentModel = useChatStore((state) => state.currentModel)

	if (isMobile) return null
	return (
		<div className='flex items-center gap-2 text-foreground text-sm'>
			<div>当前模型</div>
			<div className='text-fuchsia-500'>{currentModel?.name || '--'}</div>
		</div>
	)
}
