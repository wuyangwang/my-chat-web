'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import { BaseDialog } from '@/components/common/BaseDialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings } from 'lucide-react'
import { showToast } from '@/utils'
import { useState } from 'react'
import { useUserStore } from '@/store'

export function Footer() {
	const [input, setInput] = useState('')
	const nickName = useUserStore((state) => state.nickName)
	const setNickname = useUserStore((state) => state.setNickname)

	const onConfirm = () => {
		if (!input.trim()) {
			showToast('请输入昵称', 'error')
			return false
		}
		if (input.length > 8) {
			showToast('昵称最多8个字符', 'error')
			return false
		}
		setNickname(input)
		setInput('')
		return true
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className='flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'></div>

				<BaseDialog
					title='设置昵称'
					onConfirm={onConfirm}
					trigger={
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'>
								<Settings />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{nickName || '设置'}</span>
							</div>
						</SidebarMenuButton>
					}
				>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='name' className='text-right'>
								昵称
							</Label>
							<Input
								id='name'
								clearable
								defaultValue={nickName}
								placeholder='请输入昵称 最多8个字符'
								className='col-span-3'
								onChange={(e) => setInput(e.target.value)}
							/>
						</div>
					</div>
				</BaseDialog>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
