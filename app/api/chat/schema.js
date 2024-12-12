import { z } from 'zod'

export const chatSchema = z.object({
	prompt: z
		.string()
		.min(1, { message: '请输入至少一个字符' })
		.max(1000, { message: '最多只支持1000个字符' }),
	model: z.string().optional()
})

export const chatPostSchema = z.object({
	messages: z.array(z.object({ role: z.string(), content: z.string() })).min(1),
	model: z.string().optional()
})
