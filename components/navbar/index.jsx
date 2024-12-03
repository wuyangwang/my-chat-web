import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export function AppNavbar() {
	return (
		<header className='flex h-16 shrink-0 items-center gap-2'>
			<div className='flex items-center gap-2 px-4'>
				<SidebarTrigger className='-ml-1 h-8 w-8' />
				<Separator orientation='vertical' className='mr-2 h-4' />
			</div>
		</header>
	)
}
