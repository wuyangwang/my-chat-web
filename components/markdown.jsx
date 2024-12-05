'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownPreview({ content }) {
	return (
		<Markdown key={index} remarkPlugins={[remarkGfm]}>
			{content}
		</Markdown>
	)
}
