'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { getImage } from '@/service'
import { useModelInfo } from '@/hooks/useModelInfo'

export default function GenImage() {
	const { models, currentModel } = useModelInfo()
	const { img, setImg } = useState()
	const { prompt, setPrompt } = useState('')

	const onSubmit = async () => {
		const url = await getImage('a cat')
		setImg(url)
		setPrompt('')
	}

	return (
		<div>
			<h1>Generate Image</h1>
			<div className='flex w-full max-w-sm items-center space-x-2'>
				<Input
					placeholder='输入描述提示词'
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<Button disabled={!prompt} type='submit' onClick={onSubmit}>
					生成
				</Button>
			</div>
			{img && <Image src={img} width={500} height={500} alt='cat' unoptimized />}
		</div>
	)
}
