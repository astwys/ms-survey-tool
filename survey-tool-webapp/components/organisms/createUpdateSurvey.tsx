import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import { createSurvey, updateSurvey } from '../../requests/survey'
import {
  Question,
  QuestionType,
  QuestionWithoutId,
  Survey,
  SurveyWithoutId,
} from '../../types/Survey'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'
import InputFieldLabel from '../atoms/InputFieldLabel'
import SurveyQuestionSet from '../molecules/SurveyQuestionSet'
import { v4 as uuidv4 } from 'uuid'

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
    const newQuestion = {
      tempId: uuidv4(),
      type: 'ShortText' as QuestionType,
      text: 'Enter your question here...',
    }

    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    })
  }

  const onClickSave = async () => {
    const surveyToSave = {
      ...survey,
      questions: survey.questions.map(q => {
        if (q.tempId) {
          delete q.tempId
        }
        return q
      }),
    }
    if (props.type === 'create') {
      await createSurvey(surveyToSave)
    } else if (props.type === 'update') {
      const res = await updateSurvey((surveyToSave as Survey)._id, surveyToSave as Survey)
      if (res.status === 404) {
        console.error('An error occured. Please try again later.')
        return
      }
    }
    mutate('/api/survey')
    router.push('/dashboard')
  }

  const renderHeader = () => {
    let headerText = ''
    if (props.type === 'create') {
      headerText = 'Create Survey'
    } else if (props.type === 'update') {
      headerText = 'Edit Survey'
    }

    return <h1>{headerText}</h1>
  }

  return (
    <div className="container">
      {renderHeader()}
      <InputFieldLabel htmlFor="survey-name">Survey Name</InputFieldLabel>
      <InputField text={survey.name} id="survey-name" onChange={onChangeSurveyName} type="text" />
      <SurveyQuestionSet questions={survey.questions} onChange={onChangeQuestions} />
      <Button text="Add Question" color="primary" onClick={onClickAddQuestion} />
      <Button text="Save" color="success" onClick={onClickSave} />
    </div>
  )
}

export default CreateUpdateSurvey
