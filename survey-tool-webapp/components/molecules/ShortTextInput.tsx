import InputField from '../atoms/InputField'

type ShortTextInputProps = {}
const ShortTextInput = props => {
  return (
    <div>
      <InputField text={q.text} onChange={onChangeQuestion(q.id)} type="text" />
    </div>
  )
}

export default ShortTextInput
