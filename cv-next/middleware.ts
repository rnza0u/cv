import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from './src/translations/locales'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hasLocaleInPath = locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

    if (hasLocaleInPath)
        return
    
    const userLocales = new Negotiator({ 
        headers: Object.fromEntries(Array.from(request.headers.entries())) 
    }).languages()
    const locale = match(userLocales, locales, defaultLocale)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!_next.*|favicon.ico|sitemap.xml|robots.txt))'
    ]
} 