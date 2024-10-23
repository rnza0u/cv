import { Suspense } from 'react'
import { Loader } from '../../src/components/Loader'
import { GetServerSideProps } from 'next'

export const getServerSideProps = (async () => {

}) satisfies GetServerSideProps

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <main>
        
      </main>
    </Suspense>
  )
}
