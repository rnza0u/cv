import { ReadonlyDeep } from 'type-fest'
import styles from './table.module.scss'

type TableProps = ReadonlyDeep<{
    rows: readonly {
        label: string
        content: string
    }[]
}>

export function Table({ rows }: TableProps){
    return <table className={styles['table']}>
        <tbody>
            {rows.map(({ content, label }, i) => (
                <tr key={i}>
                    <td><strong className={styles['label']}>{ label }</strong></td>
                    <td>{ content }</td>
                </tr>
            ))}
        </tbody>
    </table>
}