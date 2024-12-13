'use client'

import { BaseDialog, DialogProvider, useDialog } from '@/components/common/BaseDialog'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings } from 'lucide-react'
import { showToast } from '@/utils'
import { useState } from 'react'
import { useUserStore } from '@/store'

export function Footer() {
	return (
		<DialogProvider>
			<SidebarMenu>
				<SidebarMenuItem>
					<div className='flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'></div>
					<SidebarMenuButton
						size='lg'
						className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
					>
						<UserDialog />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</DialogProvider>
	)
}

function UserDialog() {
	const [input, setInput] = useState('')
	const nickName = useUserStore((state) => state.nickName)
	const setNickname = useUserStore((state) => state.setNickname)
	const { openDialog, closeDialog } = useDialog()

	const onConfirm = () => {
		if (!input.trim()) {
			return showToast('请输入昵称', 'error')
		}
		if (input.length > 8) {
			return showToast('昵称最多8个字符', 'error')
		}
		setNickname(input)
		setInput('')
		closeDialog()
	}

	return (
		<BaseDialog
			title='设置昵称'
			onConfirm={onConfirm}
			trigger={
				<>
					<div
						onClick={openDialog}
						className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'
					>
						<Settings />
					</div>
					<div onClick={openDialog} className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-semibold'>{nickName || '设置'}</span>
					</div>
				</>
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
						value={nickName}
						placeholder='请输入昵称 最多8个字符'
						className='col-span-3'
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
			</div>
		</BaseDialog>
	)
}
