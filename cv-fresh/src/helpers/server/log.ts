import { Context } from '../../requests/typing.ts'

const REMOTE_IP_HEADER = 'x-forwarded-for'
const REMOTE_USER_AGENT_HEADER = 'user-agent'
const REFERRER_HEADER = 'referer'

const encoder = new TextEncoder()

const ipFromProxy = Deno.env.get('CV_IP_FROM_PROXY') === 'true'

export function logRequest(request: Request, ctx: Context): void {
  const date = new Date().toLocaleString('fr')
  const ip = ipFromProxy
    ? (request.headers.get(REMOTE_IP_HEADER) ?? '?')
    : ctx.remoteAddr.hostname
  const userAgent = request.headers.get(REMOTE_USER_AGENT_HEADER) ?? '?'
  const referrer = request.headers.get(REFERRER_HEADER) ?? 'none'
  Deno.stdout.write(
    encoder.encode(
      `${date} ${request.method} ${request.url} (ip=${ip}, user-agent=${userAgent}, referrer=${referrer})\n`
    )
  )
}
