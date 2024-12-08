import * as utils from '@/app/api/utils/index'

import { aiModelList } from '../utils/models'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
	// const env = getRequestContext().env
	const tag = utils.getQuery(request, 'tag') || 'chat'
	const arr = aiModelList.filter((item) => item.tag === tag)

	return utils.returnJson(arr[0].models)
}
