import Image from 'next/image'
import styles from './loader.module.scss'

export function Loader(){
    return <div className={styles.container}>
        <Image alt="Chargement en cours..." width="40" height="40" src="/images/loader-white.svg"/>
    </div>
}