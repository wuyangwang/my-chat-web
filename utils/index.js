import { toast } from 'sonner'

export * from './chat'
export * from './router'
export * from './models'
export * from './storage'
export * from './thinking'

export const isDev = process.env.NODE_ENV !== 'production'
export const mockApi = process.env.NEXT_PUBLIC_MOCK_API === 'true'

export function showToast(message, type) {
	if (type === 'error') {
		toast.error(message)
	} else if (type === 'success') {
		toast.success(message)
	} else {
		toast(message)
	}
}

export function downloadImg(base64Str) {
	const a = document.createElement('a')
	a.href = base64Str
	a.download = `${Date.now()}.png`
	a.click()
}

const prefixTag = 'chat_img__'
const suffixTag = '__chat_img'
export function parseImage(content) {
	if (content.includes(prefixTag)) {
		const startIndex = content.indexOf(prefixTag)
		const endIndex = content.indexOf(suffixTag)
		const image = content.substring(startIndex + prefixTag.length, endIndex)
		const text =
			content.substring(0, startIndex) + '\n' + content.substring(endIndex + suffixTag.length)
		return [text, image]
	} else {
		return [content, '']
	}
}
