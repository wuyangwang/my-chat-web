import { z } from 'zod'

export const transSchema = z.object({
	text: z
		.string()
		.min(1, { message: '请输入至少一个字符' })
		.max(500, { message: '最多只支持500个字符' }),
	source: z.enum(['zh', 'en', 'ja']),
	target: z.enum(['zh', 'en', 'ja']),
	model: z.string().optional()
})
