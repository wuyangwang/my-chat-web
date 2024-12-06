import { getModels } from '@/service'
import { useEffect } from 'react'
import { useModelStore } from '@/store'
import { usePathname } from 'next/navigation'

export function useModel() {
	const path = usePathname()
	const models = useModelStore((state) => state.models)
	const currentModel = useModelStore((state) => state.currentModel)
	const setModels = useModelStore((state) => state.setModels)
	const setCurrentModel = useModelStore((state) => state.setCurrentModel)

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
