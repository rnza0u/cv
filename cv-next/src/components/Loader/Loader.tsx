import styles from './loader.module.css'

export function Loader(){
    return <div className={styles.container}>
        <img width="30" height="30" src="/images/loader-white.svg"/>
    </div>
}