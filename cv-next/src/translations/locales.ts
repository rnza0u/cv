export const locales = ['fr', 'en'] as const
export const [defaultLocale] = locales
export type Locale = typeof locales[number]

export type LocalizedParams = Readonly<{
    locale: string
}>

export async function getLocaleFromParams(params: LocalizedParams): Promise<Locale> {
    const { locale: requestedLocale } = params
    const locale = locales.find(l => l === requestedLocale)
    if (locale !== undefined)
        return locale
    throw Error(`could not find locale ${requestedLocale}`)
}

export function getLocaleFlagImg(locale: Locale): string {
    switch (locale) {
        case 'en':
            return '/images/royaume-uni.png'
        case 'fr':
            return '/images/france.png'
    }
}