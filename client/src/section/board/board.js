import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { codeCubeApi } from './axiosRequests'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import PublicList from './publicBoard/publicList'
import PrivateList from './privateBoard/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

import { PRIVATE_BOARD, PRIVATE_LINK, PUBLIC_BOARD } from './hardWord'
import projectInitial from './projectInitial'

const Board = ({ isLoggedIn }) => {
  const [dashBoardInfo, setDashBoardInfo] = useState(projectInitial)
  const [hasHost, setHasHost] = useState(false)

  return (
    <div id="board-wrapper">
      <Toggle
        isLoggedIn={isLoggedIn}
        leftName={PUBLIC_BOARD}
        rightName={PRIVATE_BOARD}
        leftLink=""
        rightLink={PRIVATE_LINK}
        privateClass=""
      />
      <div id="board-list">
        <Routes>
          <Route index path="/" element={<PublicList isWish={false} />} />
          <Route
            path="/private/*"
            element={
              <PrivateList
                hasHost={hasHost}
                setHasHost={setHasHost}
                isLoggedIn={isLoggedIn}
                setDashBoardInfo={setDashBoardInfo}
              />
            }
          >
            <Route
              path=""
              element={
                hasHost ? (
                  <Post postId={dashBoardInfo.host.postId} />
                ) : (
                  <PublicList isWish={true} />
                )
              }
            ></Route>
            <Route
              path="waiting"
              element={<Waiting hasHost={hasHost} postId={dashBoardInfo.host.postId} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Board
