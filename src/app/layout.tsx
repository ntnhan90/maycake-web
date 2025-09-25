import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
    title: 'Ecommerce',
    description: 'The best restaurant in the world'
}

export default function RootLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body  cz-shortcut-listen="true">
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
  }