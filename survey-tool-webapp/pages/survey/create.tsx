import { useMemo } from 'react'
import CreateUpdateSurvey from '../../components/organisms/createUpdateSurvey'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { InferGetServerSidePropsType } from 'next'
import { Survey } from '../../types/Survey'

const CreateSurvey = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const survey = useMemo<Survey>(() => ({ name: '', questions: [] }), [])

  return (
    <div className="container">
      <CreateUpdateSurvey type="create" survey={survey} />
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
    props: { user: req.session.user },
  }
}, sessionOptions)

export default CreateSurvey
