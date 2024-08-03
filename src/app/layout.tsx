import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'

export const revalidate = 10

export const metadata: Metadata = {
  title: 'K - Gallery',
  description: 'K Gallery for your happiness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className='max-w-6xl mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
