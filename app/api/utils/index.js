export * from './post'
export * from './validation'

export function returnJson(data) {
	return Response.json({
		code: 200,
		message: 'success',
		data: data
	})
}

export function returnJsonError(msg, data = {}) {
	return Response.json({
		code: 0,
		message: msg,
		data: data
	})
}

export function getQuery(req, key) {
	const url = new URL(req.url || req.request.url)
	return url.searchParams.get(key) || ''
}
