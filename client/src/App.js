import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Board from './section/board/board'
import Mypage from './section/login_profile/mypage'
import Login from './section/login_profile/login'
import Signup from './section/login_profile/signup'
import GitContributionUser from './section/gitcontribution/gitContriUser'
import NoticeBoard from './section/noticeboard/noticeBoard'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'

import GlobalFont from './styles/globalFont'
import GlobalStyle from './styles/globalStyle'

import { handleLogin, handleLogout } from './actions'

axios.defaults.withCredentials = true

function App() {
  const [isSignup, setIsSignup] = useState(false)
  const [gitAccessToken, setGtiAccessToken] = useState()
  const [gitContri, setGitContri] = useState('')

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
    dispatch(handleLogout())
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
            <Mypage onLogout={onLogout} isAuthenticated={isAuthenticated} />
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
          <Board />
        </div>
      </div>
    </>
  )
}

export default App
