'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getChat } from '@/service'
import { useModelInfo } from '@/hooks/useModelInfo'

export default function GenImage() {
	const { models, currentModel } = useModelInfo()
	const [text, setText] = useState('')
	const [prompt, setPrompt] = useState('')

	const onInput = (e) => {
		setPrompt(e.target.value)
	}
	const onSubmit = async () => {
		const res = await getChat(prompt)
		setText(res.text)
		setPrompt('')
	}

	return (
		<div>
			<div className='flex w-full max-w-sm items-center space-x-2'>
				<Input placeholder='输入描述提示词' value={prompt} onChange={onInput} />
				<Button type='submit' onClick={onSubmit}>
					生成
				</Button>
			</div>

			<div className='mt-4'>{text}</div>
		</div>
	)
}
