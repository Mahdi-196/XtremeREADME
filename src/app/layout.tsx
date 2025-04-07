import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XtremeREADME - Professional README Generator',
  description: 'Create beautiful, professional README files with our rich text editor and smart features.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
} 