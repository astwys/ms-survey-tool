import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonColor = 'primary' | 'secondary' | 'success' | 'error'
type ButtonType = 'button' | 'submit' | 'reset'

type ButtonProps = {
  text: string
  color: ButtonColor
  onClick?: () => void
  type?: ButtonType
}

const Button = (props: ButtonProps) => {
  let classes
  switch (props.color) {
    case 'primary':
      classes = styles.primary
      break
    case 'secondary':
      classes = styles.secondary
      break
    case 'success':
      classes = styles.success
      break
    case 'error':
      classes = styles.errorr
      break
  }
  return (
    <button type={props.type} className={classes} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button
