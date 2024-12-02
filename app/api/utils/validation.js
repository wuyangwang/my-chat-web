import { returnJsonError } from './'

export function validReqSchema(schema, data) {
	const validation = schema.safeParse(data)
	if (!validation.success) {
		return returnJsonError('Invalid request', validation.error.flatten())
	}
	return validation.data
}
