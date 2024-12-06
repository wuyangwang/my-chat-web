'use client'

import useIsMobile from '@/hooks/useIsMobile'
import { useModelStore } from '@/store'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelInfo() {
	const isMobile = useIsMobile()
	const currentModel = useModelStore((state) => state.currentModel)
	const [isValid] = useValidRoute()

	if (isMobile) return null
	if (!isValid) return null
	return (
		<div className='flex items-center gap-2 text-foreground text-sm'>
			<div>当前模型</div>
			<div className='text-primary'>{currentModel?.name || '--'}</div>
		</div>
	)
}
