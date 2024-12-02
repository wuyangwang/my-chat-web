import { z } from 'zod'

export const genImgSchema = z.object({
	prompt: z.string().max(500, { message: '最多只支持500个字符' }),
	model: z.string().optional()
})
