import React, { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/templates/Layout'
import fetchJson, { FetchError } from '../lib/fetchJson'
import LoginForm from '../components/molecules/LoginForm'
import { NextPage } from 'next'

const Login: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    }

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  return (
    <Layout>
      <div>
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </Layout>
  )
}

export default Login
