import { FormEvent, useState } from 'react'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'

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
      <label>
        <span>Username</span>
        <InputField type="text" name="username" required text={username} onChange={setUserName} />
      </label>
      <label>
        <span>Password</span>
        <InputField
          type="password"
          name="password"
          required
          text={password}
          onChange={setPassword}
        />
      </label>

      <Button text="Login" color="primary" type="submit" onClick={onClickSubmit} />

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default LoginForm
