import { Locale } from './locales.ts'
import { Translations } from './typing.ts'

export function getTranslations(locale: Locale): Promise<Translations> {
  return import(`./${locale}.tsx`).then((m) => m[locale])
}
