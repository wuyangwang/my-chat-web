// openai 兼容格式 返回数据解析 包括 推理过程
export async function formatStreamResponse(stream, onCb) {
	let isFirstChunk = false
	let isLastChunk = false
	for await (const chunk of stream) {
		// 推理
		let thinkingContent = chunk.choices[0]?.delta?.reasoning_content || ''
		if (thinkingContent) {
			if (!isFirstChunk) {
				onCb('> **思考过程**\n')
				isFirstChunk = true
			}
			if (thinkingContent.includes('\n\n')) {
				thinkingContent = thinkingContent.replace(/\n\n/g, '\n> ')
			}
			onCb(thinkingContent)
		} else {
			if (isFirstChunk && !isLastChunk) {
				onCb('\n\n')
				isLastChunk = true
			}
			onCb(chunk.choices[0]?.delta?.content || '')
		}
	}

	onCb('[DONE]') // 兼容格式
}
