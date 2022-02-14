import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import ProjectList from './projectList/projectList'
import PrivateList from './projectList/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

import projectInitial from '../../extra/projectInitial'

const Board = ({ isLoggedIn }) => {
  const [dashBoardInfo, setDashBoardInfo] = useState(projectInitial)
  const [hasHost, setHasHost] = useState(false)

  return (
    <div id="board-wrapper" className="main-box">
      <Toggle isLoggedIn={isLoggedIn} />
      <div id="board-list">
        <Routes>
          <Route index path="/" element={<ProjectList isWishPage={false} />} />
          <Route
            path="/private/*"
            element={
              <PrivateList
                isLoggedIn={isLoggedIn}
                hasHost={hasHost}
                setHasHost={setHasHost}
                dashBoardInfo={dashBoardInfo}
                setDashBoardInfo={setDashBoardInfo}
              />
            }
          >
            <Route
              path=""
              element={
                hasHost ? (
                  <Post projectId={dashBoardInfo.host.projectId} />
                ) : (
                  <ProjectList isWishPage={true} wishList={dashBoardInfo} />
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
