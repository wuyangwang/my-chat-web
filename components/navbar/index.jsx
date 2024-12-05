import { ModelInfo } from './ModelInfo'
import { ModelSelect } from './ModelSelect'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'

export function AppNavbar() {
	return (
		<header className='flex relative h-16 shrink-0 items-center justify-between gap-2 px-4 border-b-[1px]'>
			<div className='flex items-center gap-2 '>
				<SidebarTrigger className='-ml-1 h-8 w-8' />
				<Separator orientation='vertical' className='h-4' />
				<ModelInfo />
			</div>
			<ModelSelect />
			<ThemeToggle />
		</header>
	)
}
