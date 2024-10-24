import Link from 'next/link'
import { Translations } from '../../translations/typing'
import Image from 'next/image'
import { getLocaleFlagImg, locales } from '../../translations/locales'
import styles from './header.module.scss'
import { getAge } from '../../helpers/age'

type HeaderProps = Readonly<{
    translations: Translations['header']
}>

export function Header({ translations: t }: HeaderProps){
    return (
        <div>
            <Image alt='' src='/images/me.png' className={styles['profile-picture']} width={200} height={200}/>
            <h1 className={styles.heading}>
                {t.heading}
            </h1>
            <div className={styles['locale-selectors']}>
                {locales.map((locale, i) => (
                    <Link href={`/${locale}`} key={i}>
                        <Image alt={t.localeSelectors[locale]} src={getLocaleFlagImg(locale)} width={50} height={50} className={styles['locale-selector']}/>
                    </Link>
                ))}
            </div>
            <p className={styles.introduction}>
                {t.introduction(getAge())}
            </p>
        </div>
    )
}