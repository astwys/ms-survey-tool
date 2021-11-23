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
  const [surveyUrl, setSurveyUrl] = useState<string>()

  useEffect(() => {
    if (data) {
      setSurvey(data)
    }
  }, [data])

  useEffect(() => {
    const url = `${props.host}/survey/${id}`
    setSurveyUrl(url)
  }, [id])

  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>

  return (
    <div className="container">
      <CreateUpdateSurvey type="update" survey={survey} />
      {surveyUrl && <p>Survey URL: {surveyUrl}</p>}
    </div>
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
    props: { user: req.session.user, host: req.headers.host },
  }
}, sessionOptions)

export default EditSurvey
