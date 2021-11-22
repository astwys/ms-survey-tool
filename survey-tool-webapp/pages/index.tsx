import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Survey Tool</title>
        <meta name="description" content="A webapp to create surveys for different projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  )
}

export default Home
