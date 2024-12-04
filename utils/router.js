export const RouterEnum = {
	chat: '/chat',
	genImage: '/gen-image',
	translate: '/translate',
	history: '/history'
}

export const getUrlById = (id) => {
	if (id === 1) return RouterEnum.chat
	if (id === 2) return RouterEnum.genImage
	if (id === 2) return RouterEnum.translate
	return '/'
}
