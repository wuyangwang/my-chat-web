export const RouterEnum = {
	chat: '/chat',
	genImage: '/gen-image',
	translate: '/translate',
	history: '/history'
}

export const aiToolList = [
	{
		id: 1,
		title: '聊天',
		desc: '使用最新的LLM大模型（如 LLaMA、Qwen等），提供出色的一对一聊天体验',
		url: RouterEnum.chat
	},
	{
		id: 2,
		title: '图片生成',
		desc: '输入一段文字描述，自动生成图片，模型使用stable-diffusion',
		url: RouterEnum.genImage
	},
	{
		id: 3,
		title: '文本翻译',
		desc: '输入一段文字，自动翻译为中文、英文、日文等',
		url: RouterEnum.translate
	}
]
