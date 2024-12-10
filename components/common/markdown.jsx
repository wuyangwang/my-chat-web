'use client'

import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

export function MarkdownPreview({ content }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<SyntaxHighlighter
							style={dracula} // 使用 Dracula 主题
							language={match[1]}
							PreTag='div'
							wrapLongLines
							showLineNumbers
							className='overflow-x-auto max-w-[90vw]'
							{...props}
						>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				}
			}}
		>
			{content}
		</Markdown>
	)
}
