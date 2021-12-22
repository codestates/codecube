import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GitHubLogin from './githublogin'

import './beforeLogin.css'

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [loginText, setLoginText] = useState('login')
  const navigate = useNavigate()
  const alertBox = useRef()

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }
  useEffect(() => {
    setLoginText('Login')
    alertBox.current.classList.remove('alert')
  }, [loginInfo])

  const handleSignup = () => {
    props.setIsSignup(true)
    navigate('/')
  }

  const handleLogin = async () => {
    const { email, password } = loginInfo
    alertBox.current.classList.remove('hidden')
    if (!email || !password) {
      setLoginText('이메일과 비밀번호를 입력하세요')
      alertBox.current.classList.add('alert')
    } else {
      await axios
        .post('http://localhost:4000/login', loginInfo)
        .then((res) => {
          props.isAuthenticated()
        })
        .catch((err) => {
          setLoginText('이메일과 비밀번호를 입력하세요')
          alertBox.current.classList.add('alert')
        })
    }
  }

  return (
    <div className="left-box main-box">
      <div className="lo01A th50A login01A">
        <div className="zh20A codecubelogoA">
          <img className="codeimageA" src="./dummy/codecubelogo.png" alt="codecubelog" />
        </div>
        <div className="user-input-box">
          <form className="form-wrapper" action="" onSubmit={(e) => e.preventDefault()}>
            <input
              className="inputA"
              type="email"
              placeholder="email"
              onChange={handleInputValue('email')}
            ></input>
            <input
              className="inputA"
              type="password"
              placeholder="password"
              onChange={handleInputValue('password')}
            ></input>
            <input
              ref={alertBox}
              className="login-button"
              type="submit"
              value={loginText}
              onClick={handleLogin}
            ></input>
          </form>
        </div>
      </div>
      <div className="lo02A th50A login02A">
        <GitHubLogin></GitHubLogin>
        <input
          className="mypage-btn"
          type="button"
          value="signup"
          onClick={handleSignup}
        ></input>
      </div>
    </div>
  )
}

export default Login
