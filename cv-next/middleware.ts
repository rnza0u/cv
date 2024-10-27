import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale, Locale } from './src/translations/locales'
import { NextURL } from 'next/dist/server/web/next-url'
import { isProduction } from './src/helpers/config'

const LOCALE_COOKIE_NAME = 'CV_LOCALE'
const LOCALE_COOKIE_CONFIG = {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 3600 * 60 * 24 * 7,
    secure: isProduction
} as const
const REMOTE_IP_HEADER = 'x-forwarded-for'
const REMOTE_USER_AGENT_HEADER = 'user-agent'
const REFERRER_HEADER = 'referer'

export async function middleware(request: NextRequest) {

    setTimeout(() => logRequest(request))

    const pathLocale = getLocaleFromUrl(request.nextUrl)

    if (pathLocale !== null) {  
        const cookieLocale = getLocaleFromCookies(request)
        const response = NextResponse.next()
        if (cookieLocale !== pathLocale)
            response.cookies.set(LOCALE_COOKIE_NAME, pathLocale, LOCALE_COOKIE_CONFIG)
        return response
    }
    
    const locale = getLocaleFromCookies(request) ?? inferLocaleFromRequest(request)
    const rewrittenUrl = new NextURL(request.nextUrl)
    rewrittenUrl.pathname = `/${locale}${rewrittenUrl.pathname}`
    return NextResponse.rewrite(rewrittenUrl)
}

function getLocaleFromUrl(url: NextURL): Locale|null {
    const { pathname } = url
    return locales.find(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) ?? null
}

function getLocaleFromCookies(request: NextRequest): Locale|null {
    const cookie = request.cookies.get(LOCALE_COOKIE_NAME)
    if (!cookie)
        return null
    return locales.find(l => cookie.value === l) ?? null
}

function inferLocaleFromRequest(request: NextRequest): Locale {
    const userLocales = new Negotiator({
        headers: Object.fromEntries(request.headers.entries()) 
    }).languages()
    return match(userLocales, locales, defaultLocale) as Locale
}

function logRequest(request: NextRequest): void {
    const date = new Date().toLocaleString('fr')
    const ip = request.headers.get(REMOTE_IP_HEADER) ?? '?'
    const userAgent = request.headers.get(REMOTE_USER_AGENT_HEADER) ?? '?'
    const referrer = request.headers.get(REFERRER_HEADER) ?? 'none'
    console.log(`${date} ${request.method} ${request.nextUrl.pathname} (ip=${ip}, user-agent=${userAgent}, referrer=${referrer})`)
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!_next|favicon.ico|sitemap.xml|robots.txt|images).*)'
    ]
} 