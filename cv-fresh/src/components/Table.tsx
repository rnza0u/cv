import { ReadonlyDeep } from 'type-fest'

type TableProps = ReadonlyDeep<{
  rows: readonly {
    label: string
    content: string
  }[]
}>

export function Table({ rows }: TableProps) {
  return (
    <table>
      <tbody>
        {rows.map(({ content, label }, i) => (
          <tr key={i}>
            <td className='p-2 font-bold'>
              <strong>{label}</strong>
            </td>
            <td className='p-2'>{content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
