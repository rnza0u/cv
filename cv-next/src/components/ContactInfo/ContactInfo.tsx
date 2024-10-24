'use client'

import { useState } from 'react'
import { deobfuscate } from '../../helpers/obfuscation'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import styles from './contact-info.module.scss'
import { Translations } from '../../translations/typing'
import { List } from '../List'

type ContactInfoProps = Readonly<{
    translations: Translations['contact']
}>

export function ContactInfo({ translations: t }: ContactInfoProps){

    const [fieldsHidden, setFieldsHidden] = useState(true)

    const emailLink = () => {
        const email = deobfuscate(t.email.value)
        return ExternalLink({
            label: email,
            url: `mailto:${email}`
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