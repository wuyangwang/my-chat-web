export async function post(url, data) {
	return await fetch(url, {
		body: JSON.stringify(data),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	})
}
