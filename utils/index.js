import { toast } from 'sonner'

export * from './chat'
export * from './router'
export * from './models'
export * from './storage'

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
