import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'

import List from '../components/molecules/List'
import LinkListElement from '../components/atoms/LinkListElement'

import { Survey } from '../types/Survey'

import styles from '../styles/Dashboard.module.css'
import Layout from '../components/templates/Layout'

const Dashboard: NextPage = () => {
  const { data, error } = useSWR<Survey[]>('/api/survey')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <div className={styles.container}>
        <List>
          {data.map(s => (
            <LinkListElement text={s.name} href={`/survey/edit/${s.id}`} key={s.id} />
          ))}
        </List>
        <Link href={'/survey/create'}>
          <a>Create new Survey</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Dashboard
