import { useCallback, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export function useListScroll(listRef) {
	const [showScroll, setShowScroll] = useState(false)
	const isUserScrolling = useRef(false) // 追踪用户是否手动滚动
	const { scrollYProgress } = useScroll({ container: listRef })

	useMotionValueEvent(scrollYProgress, 'change', (val) => {
		// 0 代表 滚动到顶部 1 代表 滚动到底部
		setShowScroll(val <= 0.8)
		isUserScrolling.current = val <= 0.94
	})

	const onScrollBottom = useCallback(() => {
		if (listRef?.current) {
			listRef.current.scrollTo({
				top: listRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}, [listRef])

	// 滑动到底部
	const onScroll = useCallback(() => {
		if (isUserScrolling.current) return
		onScrollBottom()
		// eslint-disable-next-line
	}, [])

	return {
		showScroll,
		onScroll,
		onScrollBottom
	}
}
