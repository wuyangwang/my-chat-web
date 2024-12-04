import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { RouterEnum } from '@/utils'
import { ImageMinus, FileType, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

const navList = [
	{ title: '聊天', url: RouterEnum.chat, icon: MessageCircleMore },
	{ title: '图片生成', url: RouterEnum.genImage, icon: ImageMinus },
	{ title: '文本翻译', url: RouterEnum.translate, icon: FileType }
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
