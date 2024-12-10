import { useEffect, useState } from 'react'

import { useScroll } from 'framer-motion'

export function useListScroll(listRef) {
	const [showScroll, setShowScroll] = useState(false)
	const { scrollYProgress } = useScroll({ container: listRef })

	// 滑动到底部
	const onScroll = () => {
		if (listRef) {
			listRef.current.scrollTo({
				top: listRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}

	useEffect(() => {
		setShowScroll(scrollYProgress.get() >= 0.9)
	}, [scrollYProgress])

	return {
		showScroll,
		onScroll
	}
}
