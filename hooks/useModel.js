import { getModels } from '@/service'
import { mapPathToKey } from '@/utils'
import { useEffect } from 'react'
import { useModelStore } from '@/store'
import { usePathname } from 'next/navigation'

// 映射 获取当前模型信息
export function useCurrentModel() {
	const path = usePathname()

	const currentModelInfo = useModelStore((state) => state.currentModelInfo)
	let key = mapPathToKey(path)

	return currentModelInfo[key] || null
}

// 映射 获取当前模型列表
export function useModel() {
	const path = usePathname()

	const models = useModelStore((state) => state.models)
	const key = mapPathToKey(path)

	return models[key] || []
}

export function useInitModel() {
	const path = usePathname()

	const setModels = useModelStore((state) => state.setModels)

	useEffect(() => {
		const fetchList = async () => {
			const arr = await getModels(path.replace('/', ''))
			setModels(arr, path)
		}

		fetchList()
		// eslint-disable-next-line
	}, [])

	return null
}
