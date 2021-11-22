import Head from 'next/head'
import Header from '../molecules/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Survey Tool</title>
      </Head>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  )
}
