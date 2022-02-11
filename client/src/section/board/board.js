import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

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
  const [wishList, setWishList] = useState(projectInitial)
  // console.log(hasHost)
  return (
    <div id="board-wrapper" className="main-box">
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
                dashBoardInfo={dashBoardInfo}
                setDashBoardInfo={setDashBoardInfo}
                setWishList={setWishList}
              />
            }
          >
            <Route
              path=""
              element={
                hasHost ? (
                  <Post projectId={dashBoardInfo.host.projectId} />
                ) : (
                  <PublicList isWish={true} wishList={wishList} />
                )
              }
            ></Route>
            <Route
              path="waiting"
              element={
                <Waiting hasHost={hasHost} projectId={dashBoardInfo.host.projectId} />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Board
