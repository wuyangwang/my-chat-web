import { z } from 'zod'

export const genImgSchema = z.object({
	prompt: z.string().required().max(500),
	model: z.string().optional()
})
