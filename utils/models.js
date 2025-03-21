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
	[ModelTypeEnum.deepseek]: 'https://api.deepseek.com/v1'
}

// 本地第三方LLM 配置模型
export const ExternalChatModelList = [
	{
		name: '谷歌gemini-2.0',
		model: 'gemini-2.0-flash',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: '谷歌gemini-2.0-图片生成',
		model: 'gemini-2.0-flash-exp-image-generation',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: '谷歌gemini-1.5',
		model: 'gemini-1.5-flash',
		maxCount: 1000,
		type: ModelTypeEnum.gemini
	},
	{
		name: 'DeepSeek',
		model: 'deepseek-chat',
		maxCount: 1000,
		type: ModelTypeEnum.deepseek
	},
	{
		name: 'DeepSeek(推理)',
		model: 'deepseek-reasoner',
		maxCount: 1000,
		type: ModelTypeEnum.deepseek
	},
	{
		name: 'OpenAi gpt-3.5',
		model: 'gpt-3.5-turbo',
		maxCount: 1000,
		type: ModelTypeEnum.openai
	},
	{
		name: 'OpenAi gpt-4o',
		model: 'gpt-4o',
		maxCount: 1000,
		type: ModelTypeEnum.openai
	},
	{
		name: 'XAI grok-2',
		model: 'grok-2-1212',
		maxCount: 1000,
		type: ModelTypeEnum.grok
	},
	{
		name: 'Ollama本地',
		model: '',
		maxCount: 1000,
		type: ModelTypeEnum.ollama
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
