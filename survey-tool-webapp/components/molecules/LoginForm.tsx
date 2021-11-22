import { FormEvent, useState } from 'react'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'
import InputFieldLabel from '../atoms/InputFieldLabel'

type FormProps = {
  errorMessage: string
  onSubmit: (username: string, password: string) => void
}

const LoginForm = (props: FormProps) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { onSubmit, errorMessage } = props

  const onClickSubmit = () => onSubmit(username, password)

  return (
    <div>
      <div>
        <InputFieldLabel htmlFor="username">Username</InputFieldLabel>
        <InputField
          id="username"
          type="text"
          name="username"
          required
          text={username}
          onChange={setUserName}
        />
      </div>
      <div>
        <InputFieldLabel htmlFor="password">Password</InputFieldLabel>
        <InputField
          type="password"
          name="password"
          required
          text={password}
          onChange={setPassword}
        />
      </div>

      <Button text="Login" color="primary" type="submit" onClick={onClickSubmit} />

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default LoginForm
