import styles from './list.module.scss'

type ListProps = Readonly<{
    noDecorations?: boolean
    noMargins?: boolean
    items: readonly (string|JSX.Element)[]
}>

export function List({ 
    noDecorations = false, 
    items, 
    noMargins = false 
}: ListProps){
    return (
        <ul 
            className={styles.list} 
            style={{
                listStyleType: noDecorations ? 'none' : 'disclosure-closed',
                ...(noMargins ? {}: {
                    marginLeft: '32px'
                })
            }}
        >
            {items.map((item, i) => (
                <li key={i}>
                    {item}
                </li>
            ))}
        </ul>
    )
}