import { Translations } from '../../translations/typing'
import Image from 'next/image'
import { getLocaleFlagImg, locales } from '../../translations/locales'
import styles from './header.module.scss'
import { getAge } from '../../helpers/age'
import { renderMode } from '../../helpers/config'

type HeaderProps = Readonly<{
    translations: Translations['header']
}>

export function Header({ translations: t }: HeaderProps){
    return (
        <div>
            <Image 
                alt='' 
                src='/images/me.png' 
                className={styles['profile-picture']} 
                width={200} 
                height={200}
            />
            <h1 className={styles.heading}>
                {t.heading}
            </h1>
            {renderMode === 'web' && <div className={styles['locale-selectors']}>
                {locales.map((locale, i) => (
                    <a  href={`/${locale}`} key={i}>
                        <Image 
                            alt={t.localeSelectors[locale]} 
                            src={getLocaleFlagImg(locale)} 
                            width={50} 
                            height={50} 
                            className={styles['locale-selector']}/>
                    </a>
                ))}
            </div>}
            <p className={styles.introduction}>
                {t.introduction(getAge())}
            </p>
        </div>
    )
}