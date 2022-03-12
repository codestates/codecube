import React, { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Profile from './section/profile'
import Board from './section/board'
import LandingPage from './section/landing'
import { getProjects } from './actions/projects'

axios.defaults.withCredentials = true

// App.js 가 unload될 때 호출할 이벤트입니다. 일단 지우지말아주세요.
// window.addEventListener('beforeunload', (e) => {
//   localStorage.removeItem('userInfo')
// })

function App() {
  const dispatch = useDispatch()
  const grass = localStorage.getItem('grass')

  useEffect(() => {
    dispatch(getProjects(grass ?? ''))
  }, [])

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Profile></Profile>
            <Board></Board>
          </>
        }
      ></Route>
      {['/login', '/signup'].map((path, idx) => (
        <Route path={path} key={idx} element={<LandingPage />}></Route>
      ))}
    </Routes>
  )
}

export default App
