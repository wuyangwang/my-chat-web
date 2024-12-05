'use client'

import { useEffect, useState } from 'react'

import { getChat } from '@/service'
import { useModelInfo } from '@/hooks/useModelInfo'

export default function GenImage() {
	const { models, currentModel } = useModelInfo()
	const { text, setText } = useState('')

	useEffect(() => {
		const onSubmit = async () => {
			const res = await getChat('a cat')
			console.log('🚀 ~ onSubmit ~ res:', res)
			setText(res.text)
		}
		onSubmit()
	}, [setText])

	if (!text) return <div>loading</div>
	return <div>{text}</div>
}
