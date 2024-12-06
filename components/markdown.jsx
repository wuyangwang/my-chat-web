'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownPreview({ content }) {
	return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
}
