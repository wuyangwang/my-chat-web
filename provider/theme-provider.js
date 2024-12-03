import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }) {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='light'
			enableSystem
			disableTransitionOnChange
			{...props}
		>
			{children}
		</NextThemesProvider>
	)
}
