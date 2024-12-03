'use server'

const host = process.env.NEXT_PUBLIC_HOST
export async function getModels() {
	const data = await fetch(`${host}/api/models`)
	const res = await data.json()
	// await sleep(5000)
	if (res.code !== 200) return []
	return res.data
}

async function sleep(ms = 1000) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
