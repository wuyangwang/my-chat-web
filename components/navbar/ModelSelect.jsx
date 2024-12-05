'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { useChatStore } from '@/store'

export function ModelSelect() {
	const models = useChatStore((state) => state.models)
	const currentModel = useChatStore((state) => state.currentModel)
	const setCurrentModel = useChatStore((state) => state.setCurrentModel)

	const onChange = (value) => {
		let obj = models.find((model) => model.name === value)
		setCurrentModel(obj)
	}

	if (!currentModel) return null
	return (
		<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<Select defaultValue={currentModel?.name} onValueChange={onChange}>
				<SelectTrigger className='w-[150px]'>
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
		</div>
	)
}
