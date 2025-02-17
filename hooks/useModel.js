import { getModels } from '@/service'
import { mapPathToKey } from '@/utils'
import { useEffect } from 'react'
import { useModelStore } from '@/store'
import { usePathname } from 'next/navigation'

export function useInitModel() {
	const path = usePathname()
	const currentModel = useCurrentModel()

	const setModels = useModelStore((state) => state.setModels)
	const setCurrentModelInfo = useModelStore((state) => state.setCurrentModelInfo)

	useEffect(() => {
		const fetchList = async () => {
			const arr = await getModels(path.replace('/', ''))
			setModels(arr, path)

			if (!currentModel) {
				setCurrentModelInfo(arr[0], path)
			}
		}

		fetchList()
	}, [path, setModels, setCurrentModelInfo, currentModel])
}

// 映射 获取当前模型列表
export function useModel() {
	const path = usePathname()

	const models = useModelStore((state) => state.models)
	const key = mapPathToKey(path)

	return models[key] || []
}

// 映射 获取当前模型信息
export function useCurrentModel() {
	const path = usePathname()

	const currentModelInfo = useModelStore((state) => state.currentModelInfo)
	let key = mapPathToKey(path)

	return currentModelInfo[key] || null
}
