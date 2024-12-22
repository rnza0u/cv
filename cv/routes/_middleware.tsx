import { MiddlewareHandler } from '../src/requests/typing.ts'
import { logRequest } from '../src/helpers/server/log.ts'
import {
  getLocaleFromCookies,
  inferLocaleFromRequest,
} from '../src/helpers/server/locale.ts'
import { redirect } from '../src/helpers/server/redirect.ts'

export const handler: MiddlewareHandler[] = [
  (_, ctx) => ctx.destination === 'notFound' ? redirect('/') : ctx.next(),
  (req, ctx) => {
    if (ctx.destination === 'route') {
      logRequest(req, ctx)
    }
    return ctx.next()
  },
  (req, ctx) => {
    ctx.state.cookieLocale = getLocaleFromCookies(req)
    ctx.state.locale = ctx.state.cookieLocale ?? inferLocaleFromRequest(req)
    return ctx.next()
  },
  async (_, ctx) => {
    const response = await ctx.next()
    response.headers.delete('x-fresh-uuid')
    return response
  }
]
