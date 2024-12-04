import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarSeparator
} from '@/components/ui/sidebar'
import { Header } from './header'
import { Footer } from './footer'
import { Nav } from './nav'

export function AppSidebar() {
	return (
		<Sidebar collapsible='icon' variant='sidebar'>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<Nav />
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<Footer />
			</SidebarFooter>
		</Sidebar>
	)
}
