import { useMotionValueEvent, useScroll } from 'framer-motion'

import { useState } from 'react'

export function useListScroll(listRef) {
	const [showScroll, setShowScroll] = useState(false)
	const { scrollYProgress } = useScroll({ container: listRef })

	useMotionValueEvent(scrollYProgress, 'change', (val) => {
		setShowScroll(val <= 0.8)
	})

	// 滑动到底部
	const onScroll = () => {
		if (listRef) {
			listRef.current.scrollTo({
				top: listRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}

	return {
		showScroll,
		onScroll
	}
}
