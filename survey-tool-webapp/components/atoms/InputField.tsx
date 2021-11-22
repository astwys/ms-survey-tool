import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { Without } from '../../types/utils'

type InputProps = Without<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>

type InputFieldProps = Partial<InputProps> & {
  text: string
  onChange: (value: string) => void
}

const InputField = (props: InputFieldProps) => {
  const currentText = props.text || ''

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    props.onChange(e.target.value)
  }

  return <input {...props} onChange={onChange} value={currentText} />
}

export default InputField
