import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Bookmark App',
  description: 'Manage your bookmarks with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground min-h-screen flex flex-col items-center" suppressHydrationWarning>
        <main className="w-full flex-1 flex flex-col items-center">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
