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
import { useCurrentModel, useModel } from '@/hooks/useModel'
import { useEffect, useMemo, useState } from 'react'

import { getOllamaModels } from '@/service/ollama'
import { useModelStore } from '@/store'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelSelect() {
	const [isValid, isChatPath, isTransPath, path] = useValidRoute()

	const currentModel = useCurrentModel()
	const models = useModel()

	const currentModelInfo = useModelStore((state) => state.currentModelInfo)
	const currentTransTarget = currentModelInfo.transTarget

	const ollamaModelInfo = useModelStore((state) => state.ollamaModelInfo)
	const ollamaModel = ollamaModelInfo().model
	const setCurrentModelInfo = useModelStore((state) => state.setCurrentModelInfo)
	const setCurrentTransTarget = useModelStore((state) => state.setCurrentTransTarget)
	const setThirdModelInfo = useModelStore((state) => state.setThirdModelInfo)

	const thirdModelKey = useModelStore((state) => state.thirdModelKey)
	const grokApiKey = thirdModelKey(ModelTypeEnum.grok)
	const geminiApiKey = thirdModelKey(ModelTypeEnum.gemini)
	const openAiApiKey = thirdModelKey(ModelTypeEnum.openai)
	const deepseekApiKey = thirdModelKey(ModelTypeEnum.deepseek)

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
		setCurrentModelInfo(obj, path)
	}

	const updateModel = (value) => {
		const model = ollamaModels.find((item) => item.model === value)
		setThirdModelInfo(ModelTypeEnum.ollama, { model })
	}

	useEffect(() => {
		if (!currentModel) return
		if (!isOllama) return

		getOllamaModels().then((res) => {
			setOllamaModels(res)
			setThirdModelInfo(ModelTypeEnum.ollama, { model: res[0].model })
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
		if (currentModel.type === ModelTypeEnum.deepseek) {
			if (!deepseekApiKey) {
				showToast('未检测到Api Key，请在左下角设置中配置')
			}
		}
	}, [currentModel, grokApiKey, geminiApiKey, openAiApiKey, deepseekApiKey])

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
						<SelectLabel>默认模型(免费)</SelectLabel>
						{models.map((model) => (
							<SelectItem key={model.name} value={model.name}>
								{model.name}
							</SelectItem>
						))}
					</SelectGroup>
					{isChatPath && (
						<SelectGroup>
							<SelectLabel>外部模型(需要api key)</SelectLabel>
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
				<Select value={currentTransTarget} onValueChange={setCurrentTransTarget}>
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
