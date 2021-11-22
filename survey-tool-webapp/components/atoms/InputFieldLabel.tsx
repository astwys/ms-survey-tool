import { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

type InputFieldLabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>

const InputFieldLabel = (props: InputFieldLabelProps) => {
  return <label {...props}>{props.children}</label>
}

export default InputFieldLabel
