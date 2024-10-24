import { PropsWithChildren } from 'react'
import styles from './main.module.scss'

type MainProps = Readonly<Required<PropsWithChildren>>

export function Main({ children }: MainProps){
    return (
        <main role="main" className={styles['main-container']}>
            {children}
        </main>
    )
}