import { ComponentChildren } from 'preact'

type MainProps = Readonly<{
  children: ComponentChildren
}>

export function Main({ children }: MainProps) {
  return (
    <main
      role='main'
      className='p-2 md:mx-[17.5vw] md:py-4 md:px-0 flex flex-col gap-4'
    >
      {children}
    </main>
  )
}
