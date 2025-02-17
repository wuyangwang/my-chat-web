'use client'

import { BaseDialog, DialogProvider, useDialog } from '@/components/common/BaseDialog'
import { ModelTypeEnum, showToast } from '@/utils'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useModelStore, useUserStore } from '@/store'

import { CopyContent } from '../common/CopyContent'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings } from 'lucide-react'
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
		deepseekApiKey: '',
		ollamaApiHost: ''
	})
	const nickName = useUserStore((state) => state.nickName)
	const setNickname = useUserStore((state) => state.setNickname)

	const thirdModelKey = useModelStore((state) => state.thirdModelKey)
	const ollamaModelInfo = useModelStore((state) => state.ollamaModelInfo)
	const setThirdModelKeys = useModelStore((state) => state.setThirdModelKeys)

	const ollamaApiHost = ollamaModelInfo().apiHost
	const grokApiKey = thirdModelKey(ModelTypeEnum.grok)
	const geminiApiKey = thirdModelKey(ModelTypeEnum.gemini)
	const openAiApiKey = thirdModelKey(ModelTypeEnum.openai)
	const deepseekApiKey = thirdModelKey(ModelTypeEnum.deepseek)

	const { openDialog, closeDialog } = useDialog()

	const onConfirm = () => {
		// if (!input.trim()) {
		// 	return showToast('请输入昵称', 'error')
		// }
		const { nickName, grokApiKey, geminiApiKey, openAiApiKey, deepseekApiKey } = form
		if (nickName && nickName.length > 8) {
			return showToast('昵称最多8个字符', 'error')
		}
		setNickname(nickName || '')
		let arr = [
			{ type: ModelTypeEnum.grok, key: grokApiKey || '' },
			{ type: ModelTypeEnum.gemini, key: geminiApiKey || '' },
			{ type: ModelTypeEnum.openai, key: openAiApiKey || '' },
			{ type: ModelTypeEnum.deepseek, key: deepseekApiKey || '' }
		]
		setThirdModelKeys(arr)
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
			deepseekApiKey,
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
				<Label className='text-center text-base font-bold'>取一个好听的名字吧</Label>
				<div className='grid grid-cols-5 items-center gap-4'>
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
				<Label className='text-center text-base font-bold'>外部模型必须的Api Key</Label>
				<div className='grid grid-cols-5 items-center gap-4'>
					<Label className='text-right'>DeepSeek</Label>
					<Input
						value={form.deepseekApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'deepseekApiKey')}
					/>
					<CopyContent content={form.deepseekApiKey} />
				</div>
				<div className='grid grid-cols-5 items-center gap-4'>
					<Label className='text-right'>Gemini</Label>
					<Input
						value={form.geminiApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'geminiApiKey')}
					/>
					<CopyContent content={form.geminiApiKey} />
				</div>
				<div className='grid grid-cols-5 items-center gap-4'>
					<Label className='text-right'>OpenAI</Label>
					<Input
						value={form.openAiApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'openAiApiKey')}
					/>
					<CopyContent content={form.openAiApiKey} />
				</div>
				<div className='grid grid-cols-5 items-center gap-4'>
					<Label className='text-right'>Grok</Label>
					<Input
						value={form.grokApiKey}
						placeholder='请输入'
						className='col-span-3'
						onChange={(e) => onInput(e.target.value, 'grokApiKey')}
					/>
					<CopyContent content={form.grokApiKey} />
				</div>
				<Label className='text-center text-base font-bold'>Ollama本地模型Api Host</Label>
				<div className='grid grid-cols-5 items-center gap-4'>
					<Label className='text-right'>Host</Label>
					<Input disabled value={form.ollamaApiHost} className='col-span-3' />
					<CopyContent content={form.ollamaApiHost} />
				</div>
			</div>
		</BaseDialog>
	)
}
