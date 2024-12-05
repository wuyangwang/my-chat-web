'use client'

import { useChatStore } from '@/store'
import useIsMobile from '@/hooks/useIsMobile'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelInfo() {
	const isMobile = useIsMobile()
	const currentModel = useChatStore((state) => state.currentModel)
	const isValid = useValidRoute()

	if (isMobile) return null
	if (!isValid) return null
	return (
		<div className='flex items-center gap-2 text-foreground text-sm'>
			<div>当前模型</div>
			<div className='text-fuchsia-500'>{currentModel?.name || '--'}</div>
		</div>
	)
}
