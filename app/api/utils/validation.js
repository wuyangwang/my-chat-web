import { returnJsonError } from './'

export function validReqSchema(schema, data) {
	const validation = schema.safeParse(data)
	if (!validation.success) {
		return [null, returnJsonError('Invalid request', validation.error.flatten())]
	} else {
		return [validation.data]
	}
}
