import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'
import InputFieldLabel from '../../components/atoms/InputFieldLabel'
import { createAnswerSet } from '../../requests/answerSet'
import { Answers, ShortTextAnswers, Survey } from '../../types/Survey'

const Survey = () => {
  const router = useRouter()
  const { id } = router.query
  const [survey, setSurvey] = useState<Survey>()
  const { data, error } = useSWR<Survey>(id ? `/api/survey/${id}` : null)
  const [answers, setAnswers] = useState<Answers[]>([])

  useEffect(() => {
    if (data) {
      setSurvey(data)
      const answerSet: ShortTextAnswers[] = data.questions.map(q => ({
        questionId: q._id as string,
        text: '',
      }))
      setAnswers(answerSet)
    }
  }, [data])

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
    await createAnswerSet(survey._id, answers)
    router.reload()
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

export default Survey
