import { ModelTypeEnum } from './models'

const keyStore = 'model-store'

export function getStorage(key) {
	return localStorage.getItem(key)
}

export function setStorage(key, value) {
	localStorage.setItem(key, value)
}

function getValue(type) {
	let value = getStorage(keyStore)
	return JSON.parse(value).state.thirdModelInfo[type]
}
export const getGrokKey = () => getValue(ModelTypeEnum.grok).apiKey
export const getDeepSeekKey = () => getValue(ModelTypeEnum.deepseek).apiKey
export const getOpenAiKey = () => getValue(ModelTypeEnum.openai).apiKey
export const getGeminiKey = () => getValue(ModelTypeEnum.gemini).apiKey

export const getOllamaHost = () => getValue(ModelTypeEnum.ollama).apiHost
