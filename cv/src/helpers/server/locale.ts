import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { defaultLocale, Locale, locales } from '../../translations/locales.ts'
import cookie from 'cookie'

const LOCALE_COOKIE_NAME = 'CV_LOCALE'
const COOKIE_HEADER_NAME = 'Cookie'
const SET_COOKIE_HEADER_NAME = 'Set-Cookie'
const LOCALE_COOKIE_CONFIG = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 3600 * 60 * 24 * 7,
  secure: Deno.env.get('CV_ENVIRONMENT') !== 'development',
} as const

export function setLocaleCookie(locale: Locale, response: Response) {
  response.headers.set(
    SET_COOKIE_HEADER_NAME,
    cookie.serialize(
      LOCALE_COOKIE_NAME,
      locale,
      LOCALE_COOKIE_CONFIG,
    ),
  )
}

export function getLocaleFromCookies(request: Request): Locale | null {
  const cookiesHeader = request.headers.get(COOKIE_HEADER_NAME)
  if (!cookiesHeader) {
    return null
  }
  const cookies = cookie.parse(cookiesHeader)
  const cookieLocale = cookies[LOCALE_COOKIE_NAME]
  if (!cookieLocale) {
    return null
  }
  return locales.find((l) => cookieLocale === l) ?? null
}

export function inferLocaleFromRequest(request: Request): Locale {
  try {
    const userLocales = new Negotiator({
      headers: Object.fromEntries(request.headers.entries()),
    }).languages()
    return match(userLocales, locales, defaultLocale) as Locale
  } catch (err) {
    console.error(err)
    return defaultLocale
  }
}
