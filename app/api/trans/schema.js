import { z } from 'zod'

export const transSchema = z.object({
	text: z.string().required().max(500),
	to: z.string().default('zh'),
	model: z.string().optional()
})
