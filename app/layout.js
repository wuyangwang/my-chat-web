import './globals.css'

import { AppNavbar } from '@/components/navbar'
import { AppSidebar } from '@/components/sidebar/'
import FullLoading from '@/components/full-loading'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/provider/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'AI聊天、翻译、图片生成',
	description: 'nextjs shadcn-ui'
}

export default function RootLayout({ children }) {
	return (
		<html lang='zh-CN'>
			<body className={inter.className}>
				<ThemeProvider>
					<SidebarProvider>
						<AppSidebar />
						<main className='flex flex-col w-full h-screen'>
							<AppNavbar />
							<div className='p-4 flex-1'>{children}</div>
						</main>
					</SidebarProvider>
					<FullLoading />
				</ThemeProvider>
				<Toaster position='top-right' richColors />
			</body>
		</html>
	)
}
