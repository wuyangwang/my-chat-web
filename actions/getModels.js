'use server'

const host = process.env.NEXT_PUBLIC_HOST
export async function getModels() {
	const data = await fetch(`${host}/api/models`)
	const res = await data.json()
	if (res.code !== 200) return []
	return res.data
}
