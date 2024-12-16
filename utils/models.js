export const ModelTypeEnum = {
	ollama: 'ollama',
	openai: 'openai',
	gemini: 'gemini', // google
	grok: 'grok' // x
}

export const ExternalModelHost = {
	[ModelTypeEnum.openai]: 'https://api.openai.com/v1',
	[ModelTypeEnum.ollama]: 'http://localhost:11434',
	[ModelTypeEnum.gemini]: '',
	[ModelTypeEnum.grok]: 'https://api.x.ai/v1'
}

// 本地第三方LLM 配置模型
export const ExternalChatModelList = [
	{
		name: 'ollama本地',
		model: '',
		maxCount: 1000,
		type: ModelTypeEnum.ollama
	},
	{
		name: 'grok-2-1212',
		model: 'grok-2-1212',
		maxCount: 1000,
		type: ModelTypeEnum.grok
	},
	{
		name: 'gemini-1.5-flash',
		model: 'gemini-1.5-flash',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: 'gpt-3.5-turbo',
		model: 'gpt-3.5-turbo',
		maxCount: 1000,
		type: ModelTypeEnum.openai
	},
	{
		name: 'gpt-4o',
		model: 'gpt-4o',
		maxCount: 1000,
		type: ModelTypeEnum.openai
	}
]

export const ExternalGenImageModelList = [
	{
		name: 'grok-2-vision-1212',
		model: 'grok-2-vision-1212',
		maxCount: 1000,
		type: ModelTypeEnum.grok
	}
]
