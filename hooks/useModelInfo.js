import { getModels } from '@/service'
import { useChatStore } from '@/store'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useModelInfo() {
	const path = usePathname()
	const models = useChatStore((state) => state.models)
	const currentModel = useChatStore((state) => state.currentModel)
	const setModels = useChatStore((state) => state.setModels)
	const setCurrentModel = useChatStore((state) => state.setCurrentModel)

	useEffect(() => {
		const fetchList = async () => {
			const arr = await getModels(path.replace('/', ''))
			setModels(arr)
			setCurrentModel(arr[0])
		}

		fetchList()
	}, [path, setModels, setCurrentModel])

	return {
		models,
		currentModel
	}
}
