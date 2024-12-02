import { useEffect, useState } from 'react'

export default function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= breakpoint)
		}

		handleResize() // 初始化

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [breakpoint])

	return isMobile
}
