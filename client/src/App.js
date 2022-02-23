import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { handleLogin, handleLogout } from './actions'
import { clearMyProject } from './actions/board'

import Profile from './section/profile'
import Board from './section/board'

const savedUserInfo = window.localStorage.getItem('userinfo')
const url = new URL(window.location.href)
const authorizationCode = url.searchParams.get('code')
const Savedcalendar = window.localStorage.getItem('usercalendar')
const stateCode = url.searchParams.get('state')
const gitcode = window.localStorage.getItem('gitcode')

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
        }
        window.localStorage.setItem('userinfo', JSON.stringify(userJSON))
        dispatch(handleLogin())
      })
  }

  const onLogout = async () => {
    setGitContri('')
    dispatch(handleLogout())
    dispatch(clearMyProject())
    window.localStorage.removeItem('codedistinguisher')
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
        gitcode: gitcode,
        stateCode: stateCode,
      })
      .then((res) => {
        // console.log('깃토큰', res.data)
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
        headers: {
          authorization: gitAccessToken,
          gitcode: window.localStorage.getItem('gitcode'),
        },
      })
      .then((res) => {
        if (gitcode === 'git') {
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
        }
        if (gitcode === 'nonegit') {
          console.log(res.data)
        }
      })
      .catch((err) => {
        console.log('이상있음')
      })
  }

  useEffect(() => {
    getAccessTocken(authorizationCode)
  }, [authorizationCode])

  return (
    <>
      <Profile></Profile>
      <Board></Board>
    </>
  )
}

export default App
