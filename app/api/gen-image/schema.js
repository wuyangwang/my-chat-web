import { z } from 'zod'

export const genImgSchema = z.object({
	prompt: z
		.string()
		.min(1, { message: '请输入至少一个字符' })
		.max(500, { message: '最多只支持500个字符' }),
	model: z.string().optional()
})
