import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gridlett — Power.. to let',
  description: 'Gridlett is a structured electricity access system that delivers reliable solar power to homes and businesses while controlling fair usage for every subscriber.',
  keywords: 'solar power, electricity access, Nigeria, energy, off-grid, subscription power',
  openGraph: {
    title: 'Gridlett — Power.. to let',
    description: 'Reliable solar electricity on a fixed monthly plan. No upfront costs. No overloading. Just power.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-brand-black antialiased">
        {children}
      </body>
    </html>
  )
}
