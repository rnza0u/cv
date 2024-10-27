'use client'

import { useState } from 'react'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import styles from './contact-info.module.scss'
import { Translations } from '../../translations/typing'
import { List } from '../List'
import { renderMode } from '../../helpers/config'
import { deobfuscate } from '../../helpers/sensitive-value'

type ContactInfoProps = Readonly<{
    translations: Translations['contact']
}>

export function ContactInfo({ translations: t }: ContactInfoProps){

    const [fieldsHidden, setFieldsHidden] = useState(renderMode === 'web')

    const emailLink = () => {
        const rendered = deobfuscate(t.email.value)
        return ExternalLink({
            label: rendered,
            url: `mailto:${rendered}`
        })
    }

    return (
        <figure>
            <figcaption className={styles.caption}>
                {t.heading}
            </figcaption>
            <div className={styles.info}>
                <List 
                    items={[
                        'N\'zaou Renaud',
                        `${t.phoneNumber.label}: ${fieldsHidden ? t.hidden : deobfuscate(t.phoneNumber.value)}`,
                        <>{t.email.label}: {fieldsHidden ? t.hidden : emailLink()}</>,
                        `${t.location.label}: ${t.location.value}`
                    ]} 
                    noMargins
                    noDecorations
                />
            </div>
            {fieldsHidden && (
                <button className={styles['show-fields-button']} onClick={() => setFieldsHidden(false)}>
                    {t.showButton}
                </button>
            )}
        </figure>
    )
}