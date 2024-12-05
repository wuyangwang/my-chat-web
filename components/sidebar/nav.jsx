import { useMemo } from 'react'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { aiToolList, RouterEnum } from '@/utils'
import { ImageMinus, FileType, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
	[RouterEnum.chat]: MessageCircleMore,
	[RouterEnum.genImage]: ImageMinus,
	[RouterEnum.translate]: FileType
}
export function Nav() {
	const navList = useMemo(
		() =>
			aiToolList.map((i) => {
				i.icon = iconMap[i.url]
				return i
			}),
		[]
	)

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
