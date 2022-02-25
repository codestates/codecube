import React from 'react'
import styled from 'styled-components'

import { Routes, Route } from 'react-router-dom'

import Public from './components/public'
import Tab from './components/tap'
import Job from './components/job'
import MyPage from './components/mypage'
import Content from './components/public/content'

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 2 0 0%;
`

const Board = () => {
  return (
    <>
      <BoardWrapper>
        <Tab />
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="" element={<Content />}></Route>
            <Route path="filter/latest" element={<Content />}></Route>
            <Route path="filter/popular" element={<Content />}></Route>
          </Route>
          <Route path="/job" element={<Job />}></Route>
          <Route path="/myPage" element={<MyPage />}></Route>
        </Routes>
      </BoardWrapper>
    </>
  )
}

export default Board
