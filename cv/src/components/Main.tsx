import { ComponentChildren } from 'preact'

type MainProps = Readonly<{
  children: ComponentChildren
}>

export function Main({ children }: MainProps) {
  return (
    <main
      role='main'
      className='py-2 md:mx-[17.5vw] md:p-4 flex flex-col gap-4'
    >
      {children}
    </main>
  )
}
