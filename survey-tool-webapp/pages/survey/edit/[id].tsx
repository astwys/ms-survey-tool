import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'

import InputField from '../../../components/atoms/InputField'

import fetcher from '../../../utils/fetcher'
import { Question, Survey } from '../../../types/Survey'

import styles from '../../../styles/EditSurvey.module.css'
import Button from '../../../components/atoms/Button'
import { updateSurvey } from '../../../requests/survey'

const EditSurvey: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [survey, setSurvey] = useState<Survey>()
  const { data, error } = useSWR<Survey>(id ? `/api/survey/${id}` : null, fetcher)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (data) {
      setSurvey(data)
    }
  }, [data])

  const onChangeQuestion = (id: number) => (text: string) => {
    if (!survey) {
      return
    }

    const newQuestions = survey?.questions.map(q => {
      if (q.id === id) {
        q.text = text
      }

      return q
    })

    setSurvey({
      ...survey,
      questions: newQuestions,
    })
  }

  const onClickAddQuestion = () => {
    if (!survey) {
      return
    }
    const newQuestion: Question = {
      id: survey?.questions[survey?.questions.length - 1].id + 1,
      type: 'ShortText',
      text: 'Enter your question here...',
    }

    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    })
  }

  const onClickSave = async () => {
    if (!survey) {
      return
    }
    const res = await updateSurvey(survey?.id, survey)
    if (res.status === 404) {
      console.error('An error occured. Please try again later.')
      return
    }
    mutate('/api/survey')
    router.push('/dashboard')
  }

  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>
  return (
    <div className={styles.container}>
      <h1>{survey.name}</h1>
      <div className={styles.questionList}>
        {survey.questions.map(q => (
          <p key={q.id}>
            <InputField text={q.text} onChange={onChangeQuestion(q.id)} inputType="text" />
          </p>
        ))}
      </div>
      <Button text="Add Question" type="primary" onClick={onClickAddQuestion} />
      <Button text="Save" type="success" onClick={onClickSave} />
    </div>
  )
}

export default EditSurvey
