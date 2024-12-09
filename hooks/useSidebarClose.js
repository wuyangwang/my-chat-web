import { useEffect } from 'react'
import useIsMobile from './useIsMobile'
import { useSidebar } from '@/components/ui/sidebar'

export function useSidebarClose(auto = true) {
	const isMobile = useIsMobile()
	const { setOpenMobile } = useSidebar()

	useEffect(() => {
		auto && isMobile && setOpenMobile(false)
	}, [auto, isMobile, setOpenMobile])

	return {
		onCloseSidebar: () => setOpenMobile(false)
	}
}
