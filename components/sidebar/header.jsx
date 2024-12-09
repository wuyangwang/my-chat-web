'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { useSidebarClose } from '@/hooks/useSidebarClose'

export function Header() {
	const { onCloseSidebar } = useSidebarClose(false)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className='flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'></div>
				<SidebarMenuButton
					isActive
					size='lg'
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
					asChild
				>
					<Link href='/' onClick={onCloseSidebar}>
						<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'>
							<Home />
						</div>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-semibold'>首页</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
