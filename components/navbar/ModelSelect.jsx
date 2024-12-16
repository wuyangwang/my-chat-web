'use client'

import { BaseDialog, DialogProvider, useDialog } from '@/components/common/BaseDialog'
import {
	ExternalChatModelList,
	ModelTypeEnum,
	getGeminiKey,
	getGrokKey,
	getOpenAiKey,
	isDev,
	setGeminiKey,
	setGrokKey,
	setOpenAiKey,
	showToast
} from '@/utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { getOllamaModels } from '@/service/ollama'
import { useModelStore } from '@/store'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelSelect() {
	const models = useModelStore((state) => state.models)
	const currentModel = useModelStore((state) => state.currentModel)
	const currentTrans = useModelStore((state) => state.currentTrans)
	const ollamaModel = useModelStore((state) => state.ollamaModel)
	const setCurrentModel = useModelStore((state) => state.setCurrentModel)
	const setCurrentTrans = useModelStore((state) => state.setCurrentTrans)
	const setOllamaModel = useModelStore((state) => state.setOllamaModel)

	const [isValid, isChatPath, isTransPath] = useValidRoute()
	const [ollamaModels, setOllamaModels] = useState([])
	const modalRef = useRef()

	const isOllama = currentModel?.type === ModelTypeEnum.ollama

	const externalModels = useMemo(() => {
		return ExternalChatModelList.map((i) => ({
			...i,
			disabled: !isDev && i.type === ModelTypeEnum.ollama
		}))
	}, [])
	const onChange = (value) => {
		let list = models.concat(externalModels)
		let obj = list.find((model) => model.name === value)
		setCurrentModel(obj)
	}

	const updateModel = (value) => {
		const model = ollamaModels.find((item) => item.model === value)
		setOllamaModel(model)
	}

	useEffect(() => {
		if (!currentModel) return
		if (!isOllama) return

		getOllamaModels().then((res) => {
			setOllamaModels(res)
			setOllamaModel(res[0].model)
		})
		// eslint-disable-next-line
	}, [isOllama, currentModel])

	useEffect(() => {
		if (!currentModel) return

		if (currentModel.type === ModelTypeEnum.grok) {
			if (!getGrokKey()) {
				modalRef.current.onOpen()
			}
		}
		if (currentModel.type === ModelTypeEnum.gemini) {
			if (!getGeminiKey()) {
				modalRef.current.onOpen()
			}
		}
		if (currentModel.type === ModelTypeEnum.openai) {
			if (!getOpenAiKey()) {
				modalRef.current.onOpen()
			}
		}
	}, [currentModel])

	if (!isValid) return null
	if (!currentModel) return null

	return (
		<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2'>
			<Select value={currentModel.name} onValueChange={onChange}>
				<SelectTrigger className='w-[130px]'>
					<SelectValue placeholder='选择一个模型' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>默认模型</SelectLabel>
						{models.map((model) => (
							<SelectItem key={model.name} value={model.name}>
								{model.name}
							</SelectItem>
						))}
					</SelectGroup>
					{isChatPath && (
						<SelectGroup>
							<SelectLabel>外部模型</SelectLabel>
							{externalModels.map((model) => (
								<SelectItem key={model.name} value={model.name} disabled={model.disabled}>
									{model.name}
								</SelectItem>
							))}
						</SelectGroup>
					)}
				</SelectContent>
			</Select>

			{isTransPath && currentModel.items && currentModel.items.length > 0 && (
				<Select value={currentTrans} onValueChange={setCurrentTrans}>
					<SelectTrigger className='w-[90px]'>
						<SelectValue placeholder='选择一个翻译目标' />
					</SelectTrigger>
					<SelectContent>
						{currentModel.items.map((item, idx) => (
							<SelectItem key={idx} value={item.source + '-' + item.target}>
								{item.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
			{isOllama && ollamaModels.length && (
				<Select value={ollamaModel} onValueChange={updateModel}>
					<SelectTrigger className='w-[110px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{ollamaModels.map((item, idx) => (
							<SelectItem key={idx} value={item.model}>
								{item.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			<DialogProvider>
				<KeyInput type={currentModel.type} name={currentModel.name} ref={modalRef} />
			</DialogProvider>
		</div>
	)
}

const KeyInput = forwardRef(({ type, name }, ref) => {
	const [input, setInput] = useState('')
	const { openDialog, closeDialog } = useDialog()

	useImperativeHandle(ref, () => ({
		onOpen: () => openDialog()
	}))

	const onConfirm = () => {
		if (!input.trim()) {
			return showToast('请输入API kEY', 'error')
		}
		if (type === ModelTypeEnum.grok) {
			setGrokKey(input)
		}
		if (type === ModelTypeEnum.gemini) {
			setGeminiKey(input)
		}
		if (type === ModelTypeEnum.openai) {
			setOpenAiKey(input)
		}
		setInput('')
		closeDialog()
	}

	return (
		<BaseDialog title='请设置key' onConfirm={onConfirm}>
			<div className='grid gap-4 py-4'>
				<div className='mb-2 text-accent-foreground/70'>
					提示：当前模型{name}需要API KEY进行访问
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='name' className='text-right'>
						API Key
					</Label>
					<Input
						id='name'
						clearable
						value={input}
						placeholder='请输入API Key'
						className='col-span-3'
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
			</div>
		</BaseDialog>
	)
})

KeyInput.displayName = 'KeyInput'
