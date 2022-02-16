import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import PublicList from './projectList/publciList'
import PrivateList from './projectList/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

import { useSelector } from 'react-redux'
import WishList from './projectList/wishList'

const Board = () => {
  const { isHost, myProject } = useSelector((state) => state.boardReducer)

  return (
    <div id="board-wrapper" className="main-box">
      <Toggle />
      <div id="board-list">
        <Routes>
          <Route index path="/" element={<PublicList />} />
          <Route path="/private/*" element={<PrivateList />}>
            <Route path="" element={isHost ? <Post /> : <WishList />}></Route>
            <Route
              path="waiting"
              element={<Waiting projectId={myProject.host.projectId} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Board
