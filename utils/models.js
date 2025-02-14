export const ModelTypeEnum = {
	ollama: 'ollama',
	openai: 'openai',
	gemini: 'gemini', // google
	deepseek: 'deepseek',
	grok: 'grok' // x
}

export const ExternalModelHost = {
	[ModelTypeEnum.openai]: 'https://api.openai.com/v1',
	[ModelTypeEnum.ollama]: 'http://localhost:11434',
	[ModelTypeEnum.gemini]: '',
	[ModelTypeEnum.grok]: 'https://api.x.ai/v1',
	[ModelTypeEnum.deepseek]: 'https://api.deepseek.com'
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
		name: 'gemini-1.5-flash',
		model: 'gemini-1.5-flash',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: 'gemini-2.0-flash-exp',
		model: 'gemini-2.0-flash-exp',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: 'deepseek-chat',
		model: 'deepseek-chat',
		maxCount: 1000,
		type: ModelTypeEnum.deepseek
	},
	{
		name: 'deepseek-reasoner(推理)',
		model: 'deepseek-reasoner',
		maxCount: 1000,
		type: ModelTypeEnum.deepseek
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
	},
	{
		name: 'grok-2-1212',
		model: 'grok-2-1212',
		maxCount: 1000,
		type: ModelTypeEnum.grok
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
