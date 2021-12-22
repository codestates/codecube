import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GitHubLogin from './githublogin'

import './beforeLogin.css'

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }

  const handleSignup = () => {
    props.setIsSignup(true)
    navigate('/')
  }

  const handleLogin = async () => {
    const { email, password } = loginInfo
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요')
    } else {
      await axios
        .post('http://localhost:4000/login', loginInfo)
        .then((res) => {
          props.isAuthenticated()
        })
        .catch((err) => {
          alert('사용자정보가 없습니다???.', err)
        })
    }
  }
  return (
    <div className="loginA main-box">
      <div className="lo01A th50A login01A">
        <div className="zh20A codecubelogoA">
          <img className="codeimageA" src="./dummy/codecubelogo.png" alt="codecubelog" />
        </div>
        <div className="zh80A">
          <form className="loginformA" action="" onSubmit={(e) => e.preventDefault()}>
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
              className="inputA login-button"
              type="submit"
              value="login"
              onClick={handleLogin}
            ></input>
            <div className="alert-boxA">{errorMessage}</div>
          </form>
        </div>
      </div>
      <div className="lo02A th50A login02A">
<<<<<<< HEAD
        {/* <div className="zh40A snslogolistA">
          <a href="https://www.google.com">
            <img className="snslogoA zw10A" src="" alt="github" />
          </a>
        </div>
        <div className="zh40A">소셜로그인</div> */}
=======
>>>>>>> 305e42ccf38e2034b7d1aa4b36ade9b41570455e
        <GitHubLogin></GitHubLogin>
        <input
          className="inputA zh20A signupA "
          type="button"
          value="signup"
          onClick={handleSignup}
        ></input>
      </div>
    </div>
  )
}

export default Login
