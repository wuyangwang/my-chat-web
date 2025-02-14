import { Copy, CopyCheck } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { cn } from '@/lib/utils'

const CopyContent = memo(({ className, content, showText = false }) => {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (!copied) return
		// 3s后还原图标
		const timer = setTimeout(() => {
			setCopied(false)
		}, 3000)
		return () => clearTimeout(timer)
	}, [copied])

	const Icon = copied ? CopyCheck : Copy
	return (
		<CopyToClipboard text={content} onCopy={() => setCopied(true)}>
			<div className='cursor-pointer relative flex items-center gap-1 text-muted-foreground'>
				<Icon
					className={cn(
						'h-4 w-4 hover:text-muted-foreground/80',
						copied && 'text-primary',
						className
					)}
				/>
				{showText && <span className='text-xs'>{copied ? '已复制' : '复制'}</span>}
			</div>
		</CopyToClipboard>
	)
})

CopyContent.displayName = 'CopyContent'
export { CopyContent }
