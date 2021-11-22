import { Question } from '../../types/Survey'
import InputField from '../atoms/InputField'
import InputFieldLabel from '../atoms/InputFieldLabel'

type SurveyQuestionSetProps = {
  questions: Question[]
  onChange: (questions: Question[]) => void
}
const SurveyQuestionSet = (props: SurveyQuestionSetProps) => {
  const onChangeQuestion = (id: number) => (text: string) => {
    const newQuestions = props.questions.map(q => {
      if (q.id === id) {
        q.text = text
      }

      return q
    })

    props.onChange(newQuestions)
  }

  return (
    <div>
      {props.questions.map(q => (
        <p key={q.id}>
          <InputFieldLabel htmlFor={`${q.id}`}>Question: </InputFieldLabel>
          <InputField text={q.text} onChange={onChangeQuestion(q.id)} type="text" id={`${q.id}`} />
        </p>
      ))}
    </div>
  )
}

export default SurveyQuestionSet
