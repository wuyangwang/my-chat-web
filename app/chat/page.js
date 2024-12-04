'use client'

import { usePathname } from 'next/navigation'

export default function Chat() {
	const path = usePathname()
	console.log('🚀 ~ Chat ~ path:', path)
	return <div>todo</div>
}
