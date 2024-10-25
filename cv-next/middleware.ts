import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale, Locale } from './src/translations/locales'

const LOCALE_COOKIE_NAME = 'CV_LOCALE'

export async function middleware(request: NextRequest) {

    console.log((request as any).headers)

    const { pathname } = request.nextUrl
    const pathLocale = locales.find(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

    if (pathLocale) {
        const existingCookie = request.cookies.get(LOCALE_COOKIE_NAME)
        if (existingCookie?.value !== pathLocale){
            const response = NextResponse.next()
            response.cookies.set(LOCALE_COOKIE_NAME, pathLocale, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 3600 * 60 * 24 * 7,
                secure: process.env.NODE_ENV !== 'development'
            })
        }
        return
    }
    
    
    const locale = request.cookies.get(LOCALE_COOKIE_NAME) ?? inferLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
}

function inferLocale(request: NextRequest): Locale {
    const userLocales = new Negotiator({
        headers: Object.fromEntries(request.headers.entries()) 
    }).languages()
    return match(userLocales, locales, defaultLocale) as Locale
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!_next.*|favicon.ico|sitemap.xml|robots.txt))'
    ]
} 