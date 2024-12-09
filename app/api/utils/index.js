export * from './post'
export * from './validation'
export * from './models'

export function returnJson(data) {
	return Response.json({
		code: 200,
		message: 'success',
		data: data
	})
}

export function returnStreamText(stream) {
	return new Response(stream, {
		status: 200,
		statusText: 'ok',
		// text/event-stream或者text/plain
		headers: { 'Content-Type': 'text/event-stream' }
	})
}

export function returnImage(response) {
	return new Response(response, { headers: { 'Content-Type': 'image/png' } })
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
