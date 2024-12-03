import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader
} from '@/components/ui/sidebar'
import { Header } from './header'
import { Footer } from './footer'

export default function AppSidebar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<Header />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<Footer />
			</SidebarFooter>
		</Sidebar>
	)
}
