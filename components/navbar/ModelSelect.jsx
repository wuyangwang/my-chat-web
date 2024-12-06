'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { useModelStore } from '@/store'
import { useValidRoute } from '@/hooks/useValidRoute'

export function ModelSelect() {
	const models = useModelStore((state) => state.models)
	const currentModel = useModelStore((state) => state.currentModel)
	const currentTrans = useModelStore((state) => state.currentTrans)
	const setCurrentModel = useModelStore((state) => state.setCurrentModel)
	const setCurrentTrans = useModelStore((state) => state.setCurrentTrans)
	const isValid = useValidRoute()

	const onChange = (value) => {
		let obj = models.find((model) => model.name === value)
		setCurrentModel(obj)
	}
	if (!isValid) return null
	if (!currentModel) return null

	return (
		<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2'>
			<Select value={currentModel.name} onValueChange={onChange}>
				<SelectTrigger className='w-[130px]'>
					<SelectValue placeholder='选择一个模型' />
				</SelectTrigger>
				<SelectContent>
					{models.map((model) => (
						<SelectItem key={model.name} value={model.name}>
							{model.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{currentModel.items && currentModel.items.length > 0 && (
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
		</div>
	)
}
