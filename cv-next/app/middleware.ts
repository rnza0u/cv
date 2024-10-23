import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['fr', 'en'] as const
const [defaultLocale] = locales

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
    return NextResponse.redirect(request.nextUrl)
}