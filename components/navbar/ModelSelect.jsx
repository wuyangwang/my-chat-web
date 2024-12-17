'use client'

import { ExternalChatModelList, ModelTypeEnum, isDev, showToast } from '@/utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useEffect, useMemo, useState } from 'react'

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
	const grokApiKey = useModelStore((state) => state.grokApiKey)
	const geminiApiKey = useModelStore((state) => state.geminiApiKey)
	const openAiApiKey = useModelStore((state) => state.openAiApiKey)

	const [isValid, isChatPath, isTransPath] = useValidRoute()
	const [ollamaModels, setOllamaModels] = useState([])

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
			if (!grokApiKey) {
				showToast('未检测到Api Key，请在左下角设置中配置')
			}
		}
		if (currentModel.type === ModelTypeEnum.gemini) {
			if (!geminiApiKey) {
				showToast('未检测到Api Key，请在左下角设置中配置')
			}
		}
		if (currentModel.type === ModelTypeEnum.openai) {
			if (!openAiApiKey) {
				showToast('未检测到Api Key，请在左下角设置中配置')
			}
		}
	}, [currentModel, grokApiKey, geminiApiKey, openAiApiKey])

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
			{isOllama && ollamaModels.length ? (
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
			) : null}
		</div>
	)
}
