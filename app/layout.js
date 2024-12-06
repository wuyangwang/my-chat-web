import './globals.css'

import { AppNavbar } from '@/components/navbar'
import { AppSidebar } from '@/components/sidebar/'
import CanvasCursor from '@/components/anim/canvas-cursor'
import FullLoading from '@/components/full-loading'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/provider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { isDev } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'AI聊天、翻译、图片生成',
	description: 'nextjs shadcn-ui'
}

export default function RootLayout({ children }) {
	return (
		<html lang='zh-CN'>
			<head>
				{isDev && <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />}
			</head>
			<body className={inter.className}>
				<ThemeProvider>
					<SidebarProvider>
						<AppSidebar />
						<main className='flex flex-col w-full h-screen overflow-hidden'>
							<AppNavbar />
							{children}
						</main>
					</SidebarProvider>
					<Toaster position='top-right' richColors />
				</ThemeProvider>
				<FullLoading />
				{/* <CanvasCursor /> */}
			</body>
		</html>
	)
}
