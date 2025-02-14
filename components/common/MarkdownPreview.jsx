'use client'

import { CopyContent } from './CopyContent'
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
						<CodePreview content={children} language={match[1] || ''} {...props} />
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

export function CodePreview({ content, language, ...props }) {
	let text = String(content).replace(/\n$/, '')
	return (
		<div className='relative'>
			<div className='flex justify-between mb-1'>
				<span className='text-xs text-muted-foreground'>{language}</span>
				<CopyContent content={text} showText />
			</div>
			<SyntaxHighlighter
				style={dracula} // 使用 Dracula 主题
				language={language}
				PreTag='div'
				wrapLongLines
				showLineNumbers
				className='overflow-x-auto max-w-[90vw]'
				{...props}
			>
				{text}
			</SyntaxHighlighter>
		</div>
	)
}
