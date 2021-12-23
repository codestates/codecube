// export default App
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Board from './section/board/board'

import Mypage from './section/login_profile/mypage'
import Login from './section/login_profile/login'
import Signup from './section/login_profile/signup'
import GitContribution from './section/gitcontribution/gitContri'
import GitContributionUser from './section/gitcontribution/gitContriUser'
import NoticeBoard from './section/noticeboard/noticeBoard'
import axios from 'axios'

require('dotenv').config()

const openApi = process.env.REACT_APP_OPEN_API

import GlobalFont from './styles/globalFont'
import GlobalStyle from './styles/globalStyle'

const savedUserInfo = window.localStorage.getItem('userinfo')
const url = new URL(window.location.href)
const authorizationCode = url.searchParams.get('code')
// console.log('깃에서받은 authorization code', authorizationCode)

function App() {
  const [File, setFile] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(savedUserInfo ?? false)
  const [userinfo, setUserinfo] = useState(JSON.parse(savedUserInfo) ?? '')
  const [isSignup, setIsSignup] = useState(false)
  const [Token, setToken] = useState('')
  const [gitAccessToken, setGtiAccessToken] = useState()
  const [gitContri, setGitContri] = useState('')
  const navigate = useNavigate()
  console.log('로그인은 했냐', isLoggedIn ? 'ㅇㅇ' : 'ㄴㄴ')

  const isAuthenticated = async () => {
    // TODO: 이제 인증은 성공했습니다. 사용자 정보를 호출하고, 이에 성공하면 로그인 상태를 바꿉시다.
    console.log('로그인 요청은 성공함.')
    await axios.get('http://localhost:4000/users').then(({ data: { data } }) => {
      const userJSON = {
        id: data.id,
        username: data.username,
        email: data.email,
        description: data.description,
        stacks: data.stacks,
        image: data.image,
      }
      window.localStorage.setItem('userinfo', JSON.stringify(userJSON))
      setUserinfo(data)
      setisLoggedIn(true)
    })
  }

  //받은 authorization 코드이용 서버로 callback api 요청
  const getAccessTocken = async (authorizationCode) => {
    await axios
      .post('http://localhost:4000/github/callback', {
        authorizationCode: authorizationCode,
      })
      .then((res) => {
        setGtiAccessToken(res.data.accessToken)
        window.localStorage.setItem('accessToken', res.data.accessToken)
        getGithudInfo(res.data.accessToken)
      })
  }

  const getGithudInfo = async (gitAccessToken) => {
    await axios
      .get('http://localhost:4000/github/userInfo', {
        headers: { authorization: gitAccessToken },
      })
      .then((res) => {
        const { login, calendar } = res.data.userInfo
        setUserinfo({ email: login + '@github.com', username: login })
        setGitContri(calendar)
        setisLoggedIn(true)
      })
  }

  useEffect(() => {
    getAccessTocken(authorizationCode)
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:4000/logout').then((res) => {
      window.localStorage.removeItem('userinfo')
      setUserinfo('')
      setisLoggedIn(false)
      navigate('/')
    })
  }

  const handleEdit = () => {
    setUserinfo(null)
    setisLoggedIn(true)
    navigate('/')
  }

  const handleSignup = () => {
    setSignupButton(true)
    navigate('/')
  }
  //사진삭제
  function clearPhoto() {
    setFile('')
  }
  //사진 입력
  function changePhoto(data) {
    console.log('사진입력')
    const {
      target: { files },
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(theFile)
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setFile(result)
    }
  }

  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <div id="container">
        <div className="col w40">
          <div className="login">
            {isLoggedIn ? (
              <Mypage
                Token={Token}
                setToken={setToken}
                userinfo={userinfo}
                handleLogout={handleLogout}
                setUserinfo={setUserinfo}
                setisLoggedIn={setisLoggedIn}
                isLoggedIn={isLoggedIn}
                isAuthenticated={isAuthenticated}
                // handleEdit={handleEdit}
                changePhoto={changePhoto}
                clearPhoto={clearPhoto}
                File={File}
              />
            ) : isSignup ? (
              <Signup
                setUserinfo={setUserinfo}
                userinfo={userinfo}
                setIsSignup={setIsSignup}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Login
                setToken={setToken}
                setisLoggedIn={setisLoggedIn}
                setUserinfo={setUserinfo}
                setIsSignup={setIsSignup}
                isAuthenticated={isAuthenticated}
              />
            )}
          </div>
        </div>
        <div className="col w30">
          <div className="row github-wrapper main-box">
            {isLoggedIn ? (
              <GitContributionUser gitContri={gitContri} />
            ) : (
              <GitContribution />
            )}
          </div>
          <div className="row notice-wrapper main-box">
            <NoticeBoard />
          </div>
        </div>
        <div className="col w30">
          <Board isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  )
}

export default App
