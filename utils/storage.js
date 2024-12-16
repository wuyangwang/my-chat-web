const prefix = 'my_chat:'
const grokKey = 'grok_key'
const geminiKey = 'gemini_key'
const openaiKey = 'openai_key'

// url
const ollamaHostKey = 'ollamaHostKey'

export function getStorage(key) {
	return localStorage.getItem(prefix + key)
}

export function setStorage(key, value) {
	localStorage.setItem(prefix + key, value)
}

export const getGrokKey = () => getStorage(grokKey)
export const setGrokKey = (value) => setStorage(grokKey, value)
export const getOpenAiKey = () => getStorage(openaiKey)
export const setOpenAiKey = (value) => setStorage(openaiKey, value)
export const getGeminiKey = () => getStorage(geminiKey)
export const setGeminiKey = (value) => setStorage(geminiKey, value)

export const getOllamaHost = () => getStorage(ollamaHostKey)
export const setOllamaHost = (value) => setStorage(ollamaHostKey, value)
