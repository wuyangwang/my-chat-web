import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/provider/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import FullLoading from '@/components/full-loading'
import { AppSidebar } from '@/components/sidebar/'
import { AppNavbar } from '@/components/navbar'
import './globals.css'

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
			</body>
		</html>
	)
}
