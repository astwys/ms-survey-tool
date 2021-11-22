import { useMemo } from 'react'
import { SurveyWithoutId } from '../../types/Survey'
import CreateUpdateSurvey from '../../components/organisms/createUpdateSurvey'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { InferGetServerSidePropsType } from 'next'

const CreateSurvey = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const survey = useMemo<SurveyWithoutId>(() => ({ name: '', questions: [] }), [])

  return <CreateUpdateSurvey type="create" survey={survey} />
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

export default CreateSurvey
