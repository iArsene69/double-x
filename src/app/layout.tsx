import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Double X',
  description: 'IDEK what is this',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-900'>{children}</body>
    </html>
  )
}
