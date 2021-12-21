import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
// import './beforeLogin.css'
import Signup from './signup'
import SnsLogin from './components/snslogin'
import profileDummy from '../../dummy/userinfo/profileDummy'
import './beforeLogin.css'

// const Login01 = styled.div`
//   width: 100%;
//   height: 100%;
// `

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  // const [isSignup, setIsSignup] = useState('false')
  const navigate = useNavigate()
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }

  const handleSignup = () => {
    props.setIsSignup(true)
    navigate('/')
  }

  // const handleLogin = () => {
  //   // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
  //   // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
  //   const { email, password } = loginInfo
  //   const result = profileDummy.filter((ele) => {
  //     return ele.email === email && ele.password === password
  //   })
  //   console.log(profileDummy)
  //   console.log('결과다', result)
  //   console.log(loginInfo)

  //   if (!email || !password) {
  //     setErrorMessage('이메일과 비밀번호를 입력하세요')
  //   } else {
  //     //   const result = profileDummy.map((ele)=>{
  //     //     if(ele.email === email && ele.password===password){
  //     //         return ele
  //     //     }

  //     // })

  //     if (result) {
  //       //   axios.post('https://localhost:4000/signin',loginInfo)
  //       //   .then(res=>{
  //       //     // console.log("로그인후받아온쿠키???", res);
  //       //     handleResponseSuccess()
  //       //   })
  //       //   .catch(err=>{
  //       //     console.log(err)
  //       //     alert('사용자정보가 없습니다.')
  //       //   })
  //       props.setisLoggedIn(true)
  //       props.setUserinfo(result)

  //       alert('로그인성공')
  //     } else {
  //       alert('사용자정보가 없습니다.')
  //     }
  //   }
  // }
  const handleLogin = async () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    const { email, password } = loginInfo
    console.log('로로로로그인인포', loginInfo)
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요')
    } else {
      await axios
        .post('http://localhost:4000/login', loginInfo)
        .then((res) => {
          console.log('로그인후받아온쿠키???', res.data)
          // props.setisLoggedIn(true)
          // navigate('/')

          // props.setUserinfo(result)
          console.log('이거진짜 토근이니 이라다 다 죽어', res.data.data.authorization)
          // props.setToken(res.data.data.authorization)
          console.log(
            '이거 아니면 손목날라간다  이라다 다 죽어',
            res.data.data.authorization
          )
          props.isAuthenticated(res.data.data.authorization)
        })
        .catch((err) => {
          console.log(err)
          alert('사용자정보가 없습니다와아???.', err)
        })
    }
  }

  return (
    // <Login>
    //   <div>로그인 화면이 있다고 가정.</div>
    // </Login>
    // {/* 여기에 뭔가 써있어야함다
    //   {Login} */}
    <div className="loginA">
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
              className="inputA"
              type="submit"
              value="login"
              onClick={handleLogin}
            ></input>
            <div className="alert-boxA">{errorMessage}</div>
          </form>
        </div>
      </div>
      <div className="lo02A th50A login02A">
        <div className="zh40A snslogolistA">
          <a href="https://www.google.com">
            <img className="snslogoA zw10A" src="" alt="github" />
          </a>
        </div>
        <div className="zh40A">소셜로그인</div>
        {/* <Link to="/signup"> */}

        <input
          className="inputA zh20A signupA "
          type="button"
          value="signup"
          onClick={handleSignup}
        ></input>

        {/* </Link> */}
      </div>
    </div>
  )
}

export default Login
