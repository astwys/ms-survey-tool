import styles from './Button.module.css'

type ButtonType = 'primary' | 'secondary' | 'success' | 'error'

type ButtonProps = {
  text: string
  onClick: () => void
  type: ButtonType
}

const Button = (props: ButtonProps) => {
  let classes
  switch (props.type) {
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
    <button className={classes} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button
