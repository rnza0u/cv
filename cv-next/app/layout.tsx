import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Renaud N\'zaou',
  description: '',
  keywords: ['developer', 'fullstack', 'engineer', 'react', 'angular', 'rust', 'nodejs', 'profile', 'resume', 'cv', 'renaud', 'n\'zaou']
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
