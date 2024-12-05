import { z } from 'zod'

export const transSchema = z.object({
	text: z
		.string()
		.min(1, { message: '请输入至少一个字符' })
		.max(500, { message: '最多只支持500个字符' }),
	to: z.string().default('zh'),
	model: z.string().optional()
})
