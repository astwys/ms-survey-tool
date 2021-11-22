import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import { createSurvey, updateSurvey } from '../../requests/survey'
import { Question, Survey, SurveyWithoutId } from '../../types/Survey'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'
import SurveyQuestionSet from '../molecules/SurveyQuestionSet'
import styles from './createUpdateSurvey.module.css'

type CreateUpdateSurveyProps = {
  type: 'create' | 'update'
  survey: Survey | SurveyWithoutId
}

const CreateUpdateSurvey = (props: CreateUpdateSurveyProps) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [survey, setSurvey] = useState<Survey | SurveyWithoutId>(props.survey)

  useEffect(() => {
    setSurvey(props.survey)
  }, [props.survey])

  const onChangeSurveyName = (name: string) => {
    setSurvey({
      ...survey,
      name,
    })
  }

  const onChangeQuestions = (questions: Question[]) =>
    setSurvey({
      ...survey,
      questions,
    })

  const onClickAddQuestion = () => {
    const id = survey.questions.length ? survey.questions[survey.questions.length - 1].id + 1 : 1
    const newQuestion: Question = {
      id,
      type: 'ShortText',
      text: 'Enter your question here...',
    }

    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    })
  }

  const onClickSave = async () => {
    if (props.type === 'create') {
      await createSurvey(survey)
    } else if (props.type === 'update') {
      const res = await updateSurvey((survey as Survey).id, survey as Survey)
      if (res.status === 404) {
        console.error('An error occured. Please try again later.')
        return
      }
    }
    mutate('/api/survey')
    router.push('/dashboard')
  }

  return (
    <div className={styles.container}>
      <InputField text={survey.name} onChange={onChangeSurveyName} type="text" />
      <SurveyQuestionSet questions={survey.questions} onChange={onChangeQuestions} />
      <Button text="Add Question" color="primary" onClick={onClickAddQuestion} />
      <Button text="Save" color="success" onClick={onClickSave} />
    </div>
  )
}

export default CreateUpdateSurvey
