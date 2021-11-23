import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'
import InputFieldLabel from '../../components/atoms/InputFieldLabel'
import { createAnswerSet } from '../../requests/answerSet'
import { Answers, ShortTextAnswers, Survey } from '../../types/Survey'
import { GetServerSideProps } from 'next'

type SurveyProps = {
  surveyToken: string
}

const Survey = (props: SurveyProps) => {
  const router = useRouter()
  const { id, token } = router.query
  const [survey, setSurvey] = useState<Survey>()
  const { data, error } = useSWR<Survey>(id ? `/api/survey/${id}` : null)
  const [answers, setAnswers] = useState<Answers[]>([])
  const [tokenValid, setTokenValid] = useState(false)

  useEffect(() => {
    if (data && tokenValid) {
      setSurvey(data)
      const answerSet: ShortTextAnswers[] = data.questions.map(q => ({
        questionId: q._id as string,
        text: '',
      }))
      setAnswers(answerSet)
    }
  }, [data, tokenValid])

  useEffect(() => {
    setTokenValid(token === props.surveyToken)
  }, [token, props.surveyToken])

  const onChangeAnswer = (id: string) => (text: string) => {
    const newAnswers = answers.map(a => {
      if (a.questionId === id) {
        a.text = text
      }
      return a
    })

    setAnswers(newAnswers)
  }

  const onSubmit = async () => {
    if (!survey) {
      return
    }
    await createAnswerSet(survey._id as string, answers)
    router.reload()
  }

  if (!tokenValid) {
    return <div>Unauthorized. Please provide to correct token.</div>
  }
  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>

  return (
    <div className="container">
      <Head>
        <title>Survey Tool</title>
      </Head>
      <h1>{survey.name}</h1>
      {survey.questions.map(q => {
        const answer = answers.find(a => a.questionId === q._id)
        return (
          <p key={q._id}>
            <InputFieldLabel htmlFor={q._id}>{q.text}</InputFieldLabel>
            <InputField
              id={q._id}
              type="text"
              text={answer?.text as string}
              onChange={onChangeAnswer(q._id as string)}
            />
          </p>
        )
      })}
      <Button color="success" text="Submit" onClick={onSubmit} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      surveyToken: process.env.SURVEY_TOKEN,
    },
  }
}

export default Survey
