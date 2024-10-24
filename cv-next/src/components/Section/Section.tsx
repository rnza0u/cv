import React, { PropsWithChildren } from 'react'
import styles from './section.module.scss'

export type SectionProps = Readonly<{
    heading: string
} & Required<PropsWithChildren>>

export function Section({ heading, children }: SectionProps){
    return <div>
        <h2 className={styles['section-heading']}>
            {heading}
        </h2>
        <div>
            {children}
        </div>
    </div>
}