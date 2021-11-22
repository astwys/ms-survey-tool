import { Question } from '../../types/Survey'
import InputField from '../atoms/InputField'
import InputFieldLabel from '../atoms/InputFieldLabel'

type SurveyQuestionSetProps = {
  questions: Question[]
  onChange: (questions: Question[]) => void
}
const SurveyQuestionSet = (props: SurveyQuestionSetProps) => {
  const onChangeQuestion = (id: string) => (text: string) => {
    const newQuestions = props.questions.map(q => {
      if (q._id === id || q.tempId === id) {
        q.text = text
      }

      return q
    })

    props.onChange(newQuestions)
  }

  return (
    <div>
      {props.questions.map(q => {
        const id = q._id || q.tempId
        return (
          <p key={q._id}>
            <InputFieldLabel htmlFor={id}>Question: </InputFieldLabel>
            <InputField
              text={q.text}
              onChange={onChangeQuestion(id as string)}
              type="text"
              id={id}
            />
          </p>
        )
      })}
    </div>
  )
}

export default SurveyQuestionSet
