import { z } from 'zod'

export const chatPostSchema = z.object({
	messages: z.array(z.object({ role: z.string(), content: z.string() })).min(1),
	model: z.string().optional(),
	accessKey: z.string()
})
