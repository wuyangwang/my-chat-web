'use client'

import { BaseDialog, DialogProvider, useDialog } from '@/components/common/BaseDialog'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useModelStore, useUserStore } from '@/store'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings } from 'lucide-react'
import { showToast } from '@/utils'
import { useState } from 'react'

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
						<SystemConfigDialog />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</DialogProvider>
	)
}

function SystemConfigDialog() {
	const [form, setForm] = useState({
		nickName: '',
		grokApiKey: '',
		geminiApiKey: '',
		openAiApiKey: '',
		ollamaApiHost: ''
	})
	const nickName = useUserStore((state) => state.nickName)
	const setNickname = useUserStore((state) => state.setNickname)

	const grokApiKey = useModelStore((state) => state.grokApiKey)
	const setGrokApiKey = useModelStore((state) => state.setGrokApiKey)
	const geminiApiKey = useModelStore((state) => state.geminiApiKey)
	const setGeminiApiKey = useModelStore((state) => state.setGeminiApiKey)
	const openAiApiKey = useModelStore((state) => state.openAiApiKey)
	const setOpenAiApiKey = useModelStore((state) => state.setOpenAiApiKey)
	const ollamaApiHost = useModelStore((state) => state.ollamaApiHost)
	// const setOllamaApiHost = useUserStore((state) => state.setOllamaApiHost)
	const { openDialog, closeDialog } = useDialog()

	const onConfirm = () => {
		// if (!input.trim()) {
		// 	return showToast('请输入昵称', 'error')
		// }
		const { nickName, grokApiKey, geminiApiKey, openAiApiKey } = form
		if (nickName && nickName.length > 8) {
			return showToast('昵称最多8个字符', 'error')
		}
		setNickname(nickName || '')
		setGrokApiKey(grokApiKey || '')
		setGeminiApiKey(geminiApiKey || '')
		setOpenAiApiKey(openAiApiKey || '')
		setForm({})
		closeDialog()
	}

	const onInput = (v, key) => {
		setForm((prev) => ({ ...prev, [key]: v }))
	}

	const onOpen = () => {
		setForm({
			nickName,
			grokApiKey,
			geminiApiKey,
			openAiApiKey,
			ollamaApiHost
		})
		openDialog()
	}

	return (
		<BaseDialog
			title='设置'
			onConfirm={onConfirm}
			trigger={
				<>
					<div
						onClick={onOpen}
						className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground'
					>
						<Settings />
					</div>
					<div onClick={onOpen} className='grid flex-1 text-left text-sm leading-tight'>
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
						value={form.nickName}
						placeholder='请输入昵称 最多8个字符'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'nickName')}
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='name' className='text-right'>
						Grok Key
					</Label>
					<Input
						value={form.grokApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'grokApiKey')}
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='name' className='text-right'>
						Gemini Key
					</Label>
					<Input
						value={form.geminiApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'geminiApiKey')}
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='name' className='text-right'>
						OpenAi Key
					</Label>
					<Input
						value={form.openAiApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'openAiApiKey')}
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='name' className='text-right'>
						Ollama Host
					</Label>
					<Input disabled value={form.ollamaApiHost} className='col-span-3' />
				</div>
			</div>
		</BaseDialog>
	)
}
