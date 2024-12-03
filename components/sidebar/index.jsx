import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarSeparator
} from '@/components/ui/sidebar'
import { Header } from './header'
import { Footer } from './footer'

export function AppSidebar() {
	return (
		<Sidebar collapsible='icon' variant='sidebar'>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<Footer />
			</SidebarFooter>
		</Sidebar>
	)
}
