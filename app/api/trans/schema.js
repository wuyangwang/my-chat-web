import { z } from 'zod'

export const transSchema = z.object({
	text: z.string().max(500, { message: '最多只支持500个字符' }),
	to: z.string().default('zh'),
	model: z.string().optional()
})
