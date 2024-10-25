'use client'

import Image from 'next/image'
import styles from './loader.module.scss'
import { useState } from 'react'

type LoaderProps = Readonly<{
    fadeOut?: boolean
}>

export function Loader({ fadeOut = false }: LoaderProps){

    const [fadedOut, setFadedOut] = useState(false)

    const reveal = () => {
        if (!fadeOut)
            return
        setFadedOut(true)
    }

    return <div className={styles.container} style={fadedOut ? { visibility: 'hidden', opacity: 0 } : {}}>
        <Image onLoad={() => reveal()} alt="Chargement en cours..." width="40" height="40" src="/images/loader-white.svg"/>
    </div>
}