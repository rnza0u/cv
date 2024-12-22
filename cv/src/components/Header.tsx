import { getAge } from '../helpers/server/age.ts'
import { RenderMode } from '../helpers/server/render-mode.ts'
import { getLocaleFlagImg, locales } from '../translations/locales.ts'
import { Translations } from '../translations/typing.ts'

type HeaderProps = Readonly<{
  translations: Translations['header']
  renderMode: RenderMode
}>

export function Header({ translations: t, renderMode }: HeaderProps) {
  return (
    <div>
      <img
        src='/images/me.png'
        className='block m-auto w-48 h-48 rounded-full mb-2'
        width={200}
        height={200}
      />
      <h1 className='text-4xl text-center font-bold mb-2'>
        {t.heading}
      </h1>
      {renderMode === 'web' && <div className='flex flex-row justify-center gap-4 mb-2'>
        {locales.map((locale, i) => (
          <a href={`/${locale}`} key={i}>
            <img
              alt={t.localeSelectors[locale]}
              src={getLocaleFlagImg(locale)}
              className='w-7 h-7'
            />
          </a>
        ))}
      </div>}
      <p className='text-center'>
        {t.introduction(getAge())}
      </p>
    </div>
  )
}
