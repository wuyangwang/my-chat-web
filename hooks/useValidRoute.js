import { RouterEnum, isValidRoute } from '@/utils'

import { usePathname } from 'next/navigation'
import { useSidebarClose } from './useSidebarClose'

export function useValidRoute() {
	useSidebarClose()
	const path = usePathname()

	return [isValidRoute(path), path === RouterEnum.translate]
}
