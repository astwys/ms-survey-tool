import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import styles from '../../styles/CreateSurvey.module.css'
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'
import { createSurvey } from '../../requests/survey'
import { Question, SurveyWithoutId } from '../../types/Survey'

const CreateSurvey = () => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [survey, setSurvey] = useState<SurveyWithoutId>({
    name: '',
    questions: [],
  })

  const onChangeSurveyName = (name: string) => {
    setSurvey({
      ...survey,
      name,
    })
  }

  const onChangeQuestion = (id: number) => (text: string) => {
    const newQuestions = survey.questions.map(q => {
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
    const id = survey.questions.length ? survey.questions[survey.questions.length - 1].id + 1 : 1
    const newQuestion: Question = {
      id,
      type: 'ShortText',
      text: 'Enter your question here...',
    }

    console.log(newQuestion)

    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    })
  }

  const onClickSave = async () => {
    await createSurvey(survey)
    mutate('/api/survey')
    router.push('/dashboard')
  }
  return (
    <div className={styles.container}>
      <InputField text={survey.name} onChange={onChangeSurveyName} inputType="text" />
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

export default CreateSurvey
