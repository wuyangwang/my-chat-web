import { useEffect } from 'react'
import { useSidebar } from '@/components/ui/sidebar'

export function useSidebarClose() {
	const { setOpen } = useSidebar()

	useEffect(() => {
		setOpen(false)
	}, [setOpen])
}
