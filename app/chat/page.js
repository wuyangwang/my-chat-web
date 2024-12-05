'use client'

import { useModelInfo } from '@/hooks/useModelInfo'

export default function Chat() {
	const { models, currentModel } = useModelInfo()

	return <div>Chat</div>
}
