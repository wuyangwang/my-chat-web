import { useCallback, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export function useListScroll(listRef) {
	const [showScroll, setShowScroll] = useState(false)
	const isUserScrolling = useRef(false) // 追踪用户是否手动滚动
	const { scrollY } = useScroll({ container: listRef })

	useMotionValueEvent(scrollY, 'change', (val) => {
		if (!listRef?.current) return

		const { scrollHeight, clientHeight } = listRef.current
		setShowScroll(val < scrollHeight - clientHeight - 70)
		isUserScrolling.current = val < scrollHeight - clientHeight - 100
	})

	// 直接滑动到底部
	const onScrollBottom = useCallback(() => {
		const { scrollHeight } = listRef.current
		listRef.current.scrollTo({
			top: scrollHeight,
			behavior: 'smooth'
		})
	}, [listRef])

	// 检查-滑动到底部
	const onScroll = useCallback(() => {
		if (!listRef?.current) return
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
