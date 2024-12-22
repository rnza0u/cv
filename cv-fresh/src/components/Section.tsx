import { JSX } from 'preact/jsx-runtime'

export type SectionProps = Readonly<{
  heading: string
  children: JSX.Element
}>

export function Section({ heading, children }: SectionProps) {
  return (
    <div>
      <h2 className='mb-2 bg-primary font-bold py-1 text-center'>
        {heading}
      </h2>
      <div>
        {children}
      </div>
    </div>
  )
}
