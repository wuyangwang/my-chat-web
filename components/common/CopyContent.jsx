import { Clipboard, ClipboardCheck } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { cn } from '@/lib/utils'

const CopyContent = memo(({ className, content }) => {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (!copied) return
		// 3s后还原图标
		const timer = setTimeout(() => {
			setCopied(false)
		}, 3000)
		return () => clearTimeout(timer)
	}, [copied])

	const Icon = copied ? ClipboardCheck : Clipboard
	return (
		<CopyToClipboard text={content} onCopy={() => setCopied(true)}>
			<Icon
				className={cn(
					'h-4 w-4 text-foreground hover:text-foreground/80',
					copied && 'text-primary',
					className
				)}
			/>
		</CopyToClipboard>
	)
})

CopyContent.displayName = 'CopyContent'
export { CopyContent }
