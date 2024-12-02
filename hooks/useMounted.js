import * as React from 'react'

// 确保 组件在客户端渲染
export default function useMounted() {
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	return mounted
}
