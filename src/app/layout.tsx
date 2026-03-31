import Navbar from '@/components/Navbar'
import { Providers } from '@/components/Providers'
import { ThemeProvider } from '@/components/ThemeProvider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'dTech Hosting — Premium Cloud Hosting for Bangladesh',
  description: 'Deploy your apps instantly with high-performance cloud hosting, VPS, and domain registration.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mesh-bg-light dark:mesh-bg-dark min-h-screen">
        <Providers>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
