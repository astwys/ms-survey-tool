import { useEffect, useState } from 'react'
import { InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Survey } from '../../../types/Survey'

import CreateUpdateSurvey from '../../../components/organisms/createUpdateSurvey'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

const EditSurvey = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { id } = router.query
  const [survey, setSurvey] = useState<Survey>()
  const { data, error } = useSWR<Survey>(id ? `/api/survey/${id}` : null)

  useEffect(() => {
    if (data) {
      setSurvey(data)
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>

  return <CreateUpdateSurvey type="update" survey={survey} />
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

export default EditSurvey
