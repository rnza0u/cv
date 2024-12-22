import { JSX } from 'preact/jsx-runtime'
import clsx from 'clsx'

type ListProps = Readonly<{
  noDecorations?: boolean
  noMargins?: boolean
  items: readonly (string | JSX.Element)[]
}>

export function List({
  noDecorations = false,
  items,
  noMargins = false,
}: ListProps) {
  return (
    <ul
      className={clsx(
        'list-inside',
        !noMargins && 'ml-8',
        noDecorations ? 'list-none' : 'list-[disclosure-closed]',
      )}
    >
      {items.map((item, i, all) => (
        <li key={i} className={clsx(i !== all.length - 1 && 'mb-1')}>
          {item}
        </li>
      ))}
    </ul>
  )
}
