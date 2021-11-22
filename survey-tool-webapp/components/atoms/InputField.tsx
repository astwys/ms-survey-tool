import { HTMLInputTypeAttribute } from 'react'

type InputFieldProps = {
  text: string
  onChange: (value: string) => void
  inputType: HTMLInputTypeAttribute
}

const InputField = (props: InputFieldProps) => {
  const currentText = props.text || ''

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    props.onChange(e.target.value)
  }

  return <input type={props.inputType} onChange={onChange} value={currentText} />
}

export default InputField
