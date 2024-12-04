import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { ImageMinus, FileType, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

const navList = [
	{ title: '聊天', url: '/chat', icon: MessageCircleMore },
	{ title: '图片生成', url: '/img', icon: ImageMinus },
	{ title: '翻译', url: '/trans', icon: FileType }
]
export function Nav() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>功能</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{navList.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
