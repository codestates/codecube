import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Board from './section/board/board'
import Mypage from './section/login_profile/mypage'
import Login from './section/login_profile/login'
import Signup from './section/login_profile/signup'
// import GitContribution from './section/gitcontribution/gitContri'
import GitContributionUser from './section/gitcontribution/gitContriUser'
import NoticeBoard from './section/noticeboard/noticeBoard'
import axios from 'axios'

import GlobalFont from './styles/globalFont'
import GlobalStyle from './styles/globalStyle'

// const url = new URL(window.location.href)
// const authorizationCode = url.searchParams.get('code')

axios.defaults.withCredentials = true
const savedUserInfo = window.localStorage.getItem('userinfo')

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(savedUserInfo ? true : false)
  const [isSignup, setIsSignup] = useState(false)
  const [gitAccessToken, setGtiAccessToken] = useState()
  const [gitContri, setGitContri] = useState('')
  const navigate = useNavigate()

  const isAuthenticated = async () => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/users', {
        withCredentials: true,
      })
      .then(({ data: { data } }) => {
        const userJSON = {
          id: data.id,
          username: data.username,
          email: data.email,
          description: data.description,
          stacks: data.stacks,
          image: data.image,
        }
        window.localStorage.setItem('userinfo', JSON.stringify(userJSON))
        setisLoggedIn(true)
      })
  }

  //받은 authorization 코드이용 서버로 callback api 요청
  // const getAccessTocken = async (authorizationCode) => {
  //   await axios
  //     .post(process.env.REACT_APP_API__URL + '/github/callback', {
  //       authorizationCode: authorizationCode,
  //     })
  //     .then((res) => {
  //       setGtiAccessToken(res.data.accessToken)
  //       window.localStorage.setItem('accessToken', res.data.accessToken)
  //       getGithudInfo(res.data.accessToken)
  //     })
  // }

  // const getGithudInfo = async (gitAccessToken) => {
  //   await axios
  //     .get(process.env.REACT_APP_API__URL + '/github/userInfo', {
  //       headers: { authorization: gitAccessToken },
  //     })
  //     .then((res) => {
  //       const { login, calendar } = res.data.userInfo
  //       setUserinfo({ email: login + '@github.com', username: login })
  //       setGitContri(calendar)
  //       setisLoggedIn(true)
  //     })
  // }

  // useEffect(() => {
  //   getAccessTocken(authorizationCode)
  // }, [])

  const handleLogout = async () => {
    setisLoggedIn(false)
    window.localStorage.removeItem('userinfo')
    navigate('/')

    await axios
      .get(process.env.REACT_APP_API__URL + '/logout', {
        withCredentials: true,
      })
      .then((res) => {})
  }

  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <div id="container">
        <div className="col w40">
          {isLoggedIn ? (
            <Mypage handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
          ) : isSignup ? (
            <Signup setIsSignup={setIsSignup} isAuthenticated={isAuthenticated} />
          ) : (
            <Login setIsSignup={setIsSignup} isAuthenticated={isAuthenticated} />
          )}
        </div>
        <div className="col w30">
          <div className="row main-box github-wrapper">
            <GitContributionUser gitContri={gitContri} />
          </div>
          <div className="row main-box notice-wrapper">
            <NoticeBoard />
          </div>
        </div>
        <div className="col w30 board-col">
          <Board isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  )
}

export default App
