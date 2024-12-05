'use client'

import { useEffect, useState } from 'react'

import { getChat } from '@/service'
import { useModelInfo } from '@/hooks/useModelInfo'

export default function GenImage() {
	const { models, currentModel } = useModelInfo()
	const { text, setText } = useState('')

	useEffect(() => {
		const onSubmit = async () => {
			const text = await getChat('a cat')
			setText(text)
		}
		onSubmit()
	}, [setText])

	return <div>{text}</div>
}
