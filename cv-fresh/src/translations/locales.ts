export const locales = ['fr', 'en'] as const
export const [defaultLocale] = locales
export type Locale = typeof locales[number]

export type LocalizedParams = Readonly<{
  locale: string
}>

export function getLocaleFlagImg(locale: Locale): string {
  switch (locale) {
    case 'en':
      return '/images/royaume-uni.png'
    case 'fr':
      return '/images/france.png'
  }
}
