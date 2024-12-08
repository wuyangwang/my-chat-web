import * as utils from '@/app/api/utils/index'

import { getRequestContext } from '@cloudflare/next-on-pages'
import { transSchema } from './schema'

export const runtime = 'edge'

export async function GET(request) {
	const env = getRequestContext().env
	const text = utils.getQuery(request, 'text')
	const source = utils.getQuery(request, 'source') || 'zh'
	const target = utils.getQuery(request, 'target') || 'en'
	const model = utils.getQuery(request, 'model') || utils.defaultTransModel

	const [validObj, err] = utils.validReqSchema(transSchema, { text, source, target })
	if (err) return err

	const inputs = {
		text: validObj.text,
		source_lang: validObj.source,
		target_lang: validObj.target
	}

	const response = await env.AI.run(model, inputs)
	return utils.returnJson({ text: response.translated_text })
}
