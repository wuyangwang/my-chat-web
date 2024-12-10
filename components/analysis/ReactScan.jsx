import Script from 'next/script'
import { isDev } from '@/utils'

export function ReactScan() {
	// 只在本地开发环境加载
	if (isDev) return <Script src='https://unpkg.com/react-scan/dist/auto.global.js' async />

	return null
}
