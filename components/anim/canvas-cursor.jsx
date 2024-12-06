'use client'

import useCanvasCursor from '@/hooks/useCanvasCursor'
import useIsMobile from '@/hooks/useIsMobile'

const CanvasCursor = () => {
	useCanvasCursor()

	const isMobile = useIsMobile()
	if (isMobile) return null

	return <canvas className='pointer-events-none fixed inset-0 -z-10' id='canvas' />
}

export default CanvasCursor
