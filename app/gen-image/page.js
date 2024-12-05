'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { getImage } from '@/service'
import { useModelInfo } from '@/hooks/useModelInfo'

export default function GenImage() {
	const { models, currentModel } = useModelInfo()
	const { img, setImg } = useState()

	useEffect(() => {
		const onSubmit = async () => {
			const img = await getImage('a cat')
			setImg(img)
		}
		onSubmit()
	}, [setImg])

	return (
		<div>
			Image
			<Image src={img} width={500} height={500} alt='cat' />
		</div>
	)
}
