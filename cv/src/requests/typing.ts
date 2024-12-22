import { Locale } from '../translations/locales.ts'
import {
  FreshContext,
  Handler as FreshHandler,
  MiddlewareHandler as FreshMiddlewareHandler,
  PageProps as FreshPageProps,
} from '$fresh/server.ts'

export type State = {
  cookieLocale?: Locale | null
  locale?: Locale
}

export type Context<T = unknown> = FreshContext<State, T>

export type PageProps<T = unknown> = FreshPageProps<T, State>

export type Handler<T = unknown> = FreshHandler<T, State>

export type MiddlewareHandler = FreshMiddlewareHandler<State>
