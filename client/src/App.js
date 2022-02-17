import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Board from './section/board/board'
import Mypage from './section/login_profile/mypage'
import Login from './section/login_profile/login'
import Signup from './section/login_profile/signup'
import GithubContribution from './section/gitcontribution/githubContribution'
import NoticeBoard from './section/noticeboard/noticeBoard'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'

import GlobalFont from './styles/globalFont'
import GlobalStyle from './styles/globalStyle'

import { handleLogin, handleLogout } from './actions'
import { clearMyProject } from './actions/board'

const savedUserInfo = window.localStorage.getItem('userinfo')
const url = new URL(window.location.href)
const authorizationCode = url.searchParams.get('code')
const Savedcalendar = window.localStorage.getItem('usercalendar')

axios.defaults.withCredentials = true

function App() {
  const [isSignup, setIsSignup] = useState(false)
  const [gitAccessToken, setGtiAccessToken] = useState()
  const [gitContri, setGitContri] = useState(JSON.parse(Savedcalendar) ?? '')
  const [userinfo, setUserinfo] = useState(JSON.parse(savedUserInfo) ?? '')
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const dispatch = useDispatch()

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
        dispatch(handleLogin())
      })
  }

  const onLogout = async () => {
    setGitContri('')
    dispatch(handleLogout())
    dispatch(clearMyProject())

    window.localStorage.removeItem('userinfo')
    window.localStorage.removeItem('usercalendar')
    navigate('/')

    await axios
      .get(process.env.REACT_APP_API__URL + '/logout', {
        withCredentials: true,
      })
      .then((res) => {})
  }

  //받은 authorization 코드이용 서버로 callback api 요청
  const getAccessTocken = async (authorizationCode) => {
    await axios
      .post(process.env.REACT_APP_API__URL + '/github/callback', {
        authorizationCode: authorizationCode,
      })
      .then((res) => {
        // console.log(res.data.accessToken)
        setGtiAccessToken(res.data.accessToken)
        window.localStorage.setItem('accessToken', res.data.accessToken)
        getGithudInfo(res.data.accessToken)
      })
      .catch((err) => {
        console.log('깃토큰 없음')
      })
  }

  const getGithudInfo = async (gitAccessToken) => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/github/userInfo', {
        headers: { authorization: gitAccessToken },
      })
      .then((res) => {
        // console.log(res.data.userInfo)
        const { login, calendar } = res.data.userInfo
        setUserinfo({ email: login + '@github.com', username: login })
        const userJSON = {
          username: login,
          email: login + '@github.com',
        }
        window.localStorage.setItem('userinfo', JSON.stringify(userJSON))
        const userCalendarJSON = calendar
        window.localStorage.setItem('usercalendar', JSON.stringify(userCalendarJSON))
        setGitContri(JSON.parse(window.localStorage.getItem('usercalendar')))
        dispatch(handleLogin())
      })
      .catch((err) => {
        console.log('이상있음')
      })
  }

  useEffect(() => {
    getAccessTocken(authorizationCode)
  }, [])

  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <div id="container">
        <div className="col w40">
          {isLoggedIn ? (
            <Mypage onLogout={onLogout} isAuthenticated={isAuthenticated} />
          ) : isSignup ? (
            <Signup setIsSignup={setIsSignup} isAuthenticated={isAuthenticated} />
          ) : (
            <Login setIsSignup={setIsSignup} isAuthenticated={isAuthenticated} />
          )}
        </div>
        <div className="col w30">
          <div className="row main-box github-wrapper">
            <GithubContribution gitContri={gitContri} />
          </div>
          <div className="row main-box notice-wrapper">
            <NoticeBoard />
          </div>
        </div>
        <div className="col w30 board-col">
          <Board />
        </div>
      </div>
    </>
  )
}

export default App
