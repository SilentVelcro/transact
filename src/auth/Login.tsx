import React, { useState } from 'react'
import { authenticate } from '.'
import { LoginProps, LoginState } from '../types'

const initialLoginState = {
  username: 'user_bad',
  password: 'password_bad',
  loginError: undefined,
}

const Login: React.FC<LoginProps> = ({onSignIn}) => {
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState)


  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, username: event.currentTarget.value })
  }

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, password: event.currentTarget.value })
  }

  const setLoginError = (error: string) => {
    setLoginState({ ...initialLoginState, loginError: error })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value

    const password = target.password.value

    if (await authenticate(username, password)) {
      await onSignIn()
    } else {
      setLoginError('Invalid username or password.')
    }
  }

    return (
      <form onSubmit={handleSubmit} style={formStyles}>
        <input
          value={loginState.username}
          name="username"
          placeholder="Username"
          onChange={changeUsername}
          style={inputStyles}
        />
        <input
          value={loginState.password}
          name="password"
          placeholder="Password"
          onChange={changePassword}
          style={inputStyles}
        />
        {loginState.loginError ? (
          <div style={{ fontFamily: 'sans-serif', color: 'pink' }}>
            {loginState.loginError}
          </div>
        ) : (
          <div style={{ height: '1em' }}></div>
        )}
        <input type="submit" />
      </form>
    )
}

const formStyles = {
  height: '200px',
  width: '300px',
  border: '2px solid black',
  padding: '3rem',
  display: 'grid',
  gap: '10px',
  gridTemplateColumns: '1fr',
}

const inputStyles = { height: '1.5rem', padding: '0.25rem' }

export default Login;
