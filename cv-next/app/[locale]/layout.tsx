import '../globals.scss'
import { PropsWithChildren } from 'react'
import { getLocaleFromParams, LocalizedParams } from '../../src/translations/locales'
import { Crimson_Pro } from 'next/font/google'

type RootLayoutProps = Readonly<{
  params: Promise<LocalizedParams>
} & Required<PropsWithChildren>>

const crimsonPro = Crimson_Pro({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700']
})

export default async function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={await getLocaleFromParams(await params)} className={crimsonPro.className}>
      <body>{children}</body>
    </html>
  )
}
