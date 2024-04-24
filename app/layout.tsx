import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TastyTrails',
  description: 'A stop where the most delicious dishes are gathered.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
