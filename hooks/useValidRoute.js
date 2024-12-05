import { isValidRoute } from '@/utils'
import { usePathname } from 'next/navigation'

export function useValidRoute() {
	const path = usePathname()

	return isValidRoute(path)
}
