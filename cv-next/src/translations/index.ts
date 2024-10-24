import 'server-only'
import { Locale } from './locales'
import { Translations } from './typing'

export function getTranslations(locale: Locale): Promise<Translations> {
    return import(`./${locale}`).then(m => m[locale])
}
  