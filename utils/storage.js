const keyStore = 'model-store'

export function getStorage(key) {
	return localStorage.getItem(key)
}

export function setStorage(key, value) {
	localStorage.setItem(key, value)
}

function getValue(key) {
	let value = getStorage(keyStore)
	return JSON.parse(value).state[key]
}
export const getGrokKey = (key = 'grokApiKey') => getValue(key)

export const getOpenAiKey = (key = 'openaiApiKey') => getValue(key)
export const getGeminiKey = (key = 'geminiApiKey') => getValue(key)

export const getOllamaHost = (key = 'ollamaApiHost') => getValue(key)
