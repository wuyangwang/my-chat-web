import { z } from 'zod'

export const chatSchema = z.object({
	prompt: z.string().required().max(500),
	model: z.string().optional()
})
