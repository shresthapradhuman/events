import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'EVENTS | Online Event Marketplace',
  description:
    'Create, Discover, And Share Events online: concerts, conferences & more.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.variable,
          'relative w-full font-sans antialiased',
        )}
      >
          {children}
          <Toaster />
      </body>
    </html>
  )
}
