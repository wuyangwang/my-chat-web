'use client'

import 'react-photo-view/dist/react-photo-view.css'

import { PhotoProvider, PhotoView } from 'react-photo-view'

import Image from 'next/image'

export function ImagePreview({ src }) {
	return (
		<PhotoProvider>
			<PhotoView src={src}>
				<Image src={src} alt='image' unoptimized width={350} height={350} />
			</PhotoView>
		</PhotoProvider>
	)
}
