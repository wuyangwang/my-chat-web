import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Home } from 'lucide-react'

export function Header() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className='flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'></div>
				<SidebarMenuButton
					size='lg'
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
				>
					<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
						<Home />
					</div>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-semibold'>Home</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
