import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import useSWR from 'swr'

import List from '../components/molecules/List'
import LinkListElement from '../components/atoms/LinkListElement'

import { Survey } from '../types/Survey'

import Layout from '../components/templates/Layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../lib/session'

const Dashboard = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = props
  const { data, error } = useSWR<Survey[]>('/api/survey')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <div className="container">
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

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user

  if (user === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
}, sessionOptions)

export default Dashboard
