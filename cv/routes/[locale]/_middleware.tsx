import { setLocaleCookie } from '../../src/helpers/server/locale.ts'
import { redirect } from '../../src/helpers/server/redirect.ts'
import { MiddlewareHandler } from '../../src/requests/typing.ts'
import { locales } from '../../src/translations/locales.ts'

export const handler: MiddlewareHandler[] = [
  async (_req, ctx) => {
    const paramsLocale = locales.find((l) => l === ctx.params['locale'])
    if (!paramsLocale) {
      return redirect('/')
    }
    ctx.state.locale = paramsLocale
    const response = await ctx.next()
    if (paramsLocale !== ctx.state.cookieLocale) {
      setLocaleCookie(paramsLocale, response)
    }
    return response
  },
]
