import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import useUser from '../lib/useUser'

const Home: NextPage = () => {
  const { user } = useUser()

  const renderLoggedInInfo = () => (
    <p>
      Welcome! Check out the{' '}
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>{' '}
      to see all surveys
    </p>
  )
  const renderLoggedOutInfo = () => (
    <p>
      Please{' '}
      <Link href="/login">
        <a>log in</a>
      </Link>{' '}
      to access the Survey Tool
    </p>
  )

  return (
    <Layout>
      <div className="container">
        <main>
          <h1>Survey Tool</h1>
          {user?.isLoggedIn ? renderLoggedInInfo() : renderLoggedOutInfo()}
        </main>
      </div>
    </Layout>
  )
}

export default Home
