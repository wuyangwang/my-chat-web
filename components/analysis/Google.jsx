import Script from 'next/script'
import { isDev } from '@/utils'

export function GoogleAnalysis() {
	if (isDev) return null

	const tagId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
	return (
		<>
			<Script
				async
				strategy='lazyOnload'
				src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
			/>
			<Script
				id='_google-analytics'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${tagId}');
          `
				}}
			/>
		</>
	)
}
