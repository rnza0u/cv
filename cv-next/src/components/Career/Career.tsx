import { ReadonlyDeep } from 'type-fest'
import { List } from '../List'
import styles from './career.module.scss'

type CareerProps = ReadonlyDeep<{
    companies: readonly {
        position: string|JSX.Element
        period: string
        tasks: readonly (string|JSX.Element)[]
    }[]
}>

export function Career({ companies }: CareerProps){
    return (
        <div className={styles.container}>
            {companies.map(({ position, period, tasks }, i) => {
                return (
                    <div className={styles.company} key={i}>
                        <strong className={styles.position}>{period}: {position}</strong>
                        <List noDecorations={true} items={tasks} />
                    </div>
                )
            })}
        </div>
    )
}