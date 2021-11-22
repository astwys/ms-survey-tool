import { useRouter } from 'next/router'
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
  const [answers, setAnswers] = useState<Answers>({})

  useEffect(() => {
    if (data) {
      setSurvey(data)
      const answerSet: ShortTextAnswers = {}
      data.questions.forEach(q => (answerSet[q.id] = ''))
      setAnswers(answerSet)
    }
  }, [data])

  const onChangeAnswer = (id: string) => (text: string) => {
    const newAnswers = { ...answers }
    newAnswers[id] = text
    setAnswers(newAnswers)
  }

  const onSubmit = async () => {
    if (!survey) {
      return
    }
    await createAnswerSet(survey.id, answers)
    router.reload()
  }

  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>
  return (
    <div className="container">
      <h1>{survey.name}</h1>
      {survey.questions.map(q => (
        <p key={q.id}>
          <InputFieldLabel htmlFor={q.id}>{q.text}</InputFieldLabel>
          <InputField id={q.id} type="text" text={answers[q.id]} onChange={onChangeAnswer(q.id)} />
        </p>
      ))}
      <Button color="success" text="Submit" onClick={onSubmit} />
    </div>
  )
}

export default Survey
