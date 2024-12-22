import { ReadonlyDeep } from 'type-fest'
import { List } from './List.tsx'
import { JSX } from 'preact/jsx-runtime'

type CareerProps = ReadonlyDeep<{
  companies: readonly {
    position: string | JSX.Element
    period: string
    tasks: readonly (string | JSX.Element)[]
  }[]
}>

export function Career({ companies }: CareerProps) {
  return (
    <div className='flex flex-col gap-4'>
      {companies.map(({ position, period, tasks }, i) => {
        return (
          <div className='flex flex-col gap-2' key={i}>
            <strong className='block font-bold'>{period}: {position}</strong>
            <List noDecorations items={tasks} />
          </div>
        )
      })}
    </div>
  )
}
