import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Toggle from '../../components/toggle/toggle'
import PublicList from './projectList/publciList'
import PrivateList from './projectList/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

import { useSelector } from 'react-redux'
import WishList from './projectList/wishList'
import styled from 'styled-components'

const BoardWrapper = styled.div`
  display: flex;
  position: relative;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;
  margin: 0.4rem;
  padding: 2rem 1rem;
  height: 100%;
`

const BoardList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  max-width: 35rem;
  padding: 1rem;
  padding-top: 2rem;
  height: 38.2rem;
`

const Board = () => {
  const { isHost } = useSelector((state) => state.boardReducer)

  return (
    <BoardWrapper className="main-box">
      <Toggle />
      <BoardList>
        <Routes>
          <Route index path="/" element={<PublicList />} />
          <Route path="private" element={<PrivateList />}>
            <Route path="" element={isHost ? <Post /> : <WishList />}></Route>
            <Route path="waiting" element={<Waiting />} />
          </Route>
        </Routes>
      </BoardList>
    </BoardWrapper>
  )
}

export default Board
