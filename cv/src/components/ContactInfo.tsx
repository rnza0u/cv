import { deobfuscate } from '../helpers/client/deobfuscate.ts'
import { RenderMode } from '../helpers/server/render-mode.ts'
import { Translations } from '../translations/typing.ts'
import { ExternalLink } from './ExternalLink.tsx'
import { List } from './List.tsx'
import { useSignal } from '@preact/signals'
import clsx from 'clsx'

type ContactInfoProps = Readonly<{
  translations: Translations['contact'],
  renderMode: RenderMode
}>

export function ContactInfo({ translations: t, renderMode }: ContactInfoProps) {
  const fieldsHidden = useSignal(renderMode === 'web')

  const emailLink = () => {
    const email = deobfuscate(t.email.value)
    return ExternalLink({
      label: email,
      url: `mailto:${email}`,
    })
  }

  return (
    <figure>
      <figcaption className='font-bold mb-1'>
        {t.heading}
      </figcaption>
      <div className='mb-2'>
        <List
          items={[
            "N'zaou Renaud",
            `${t.phoneNumber.label}: ${
              fieldsHidden.value ? t.hidden : deobfuscate(t.phoneNumber.value)
            }`,
            <>{t.email.label}: {fieldsHidden.value ? t.hidden : emailLink()}</>,
            `${t.location.label}: ${t.location.value}`,
          ]}
          noMargins
          noDecorations
        />
      </div>
      {fieldsHidden.value && (
        <button
          className={clsx(
            'flex flex-row justify-center items-center py-2 px-4 border border-foreground bg-background rounded-md transition-colors',
            'hover:bg-foreground hover:text-background',
          )}
          onClick={() => fieldsHidden.value = false}
        >
          {t.showButton}
        </button>
      )}
    </figure>
  )
}
