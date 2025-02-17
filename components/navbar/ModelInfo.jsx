'use client'

import { useCurrentModel } from '@/hooks/useModel'
import useIsMobile from '@/hooks/useIsMobile'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelInfo() {
	const isMobile = useIsMobile()
	const [isValid] = useValidRoute()

	const currentModel = useCurrentModel()

	if (isMobile) return null
	if (!isValid) return null

	return (
		<div className='flex items-center gap-2 text-foreground text-sm'>
			<div>当前模型</div>
			<div className='text-primary'>{currentModel?.name || '--'}</div>
		</div>
	)
}
