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

export function compressImage(base64) {
	return new Promise((resolve) => {
		const img = new Image()
		const key = 'data:image/png;base64,'
		img.src = base64.startsWith(key) ? base64 : key + base64
		img.onload = function () {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			// 设置新的宽高（可以调整压缩率）
			const MAX_WIDTH = 600 // 限制宽度
			const scaleSize = MAX_WIDTH / img.width
			canvas.width = MAX_WIDTH
			canvas.height = img.height * scaleSize

			// 绘制压缩后的图片
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

			// 转为压缩后的 Base64（质量 0.7，减少体积）
			const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
			resolve(compressedBase64)
		}
	})
}
