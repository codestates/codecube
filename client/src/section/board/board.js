import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import ProjectList from './projectList/projectList'
import PrivateList from './projectList/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

import projectInitial from '../../extra/projectInitial'
import { useSelector } from 'react-redux'

const Board = () => {
  const { isHost, myProject } = useSelector((state) => state.boardReducer)

  const [dashBoardInfo, setDashBoardInfo] = useState(projectInitial)

  return (
    <div id="board-wrapper" className="main-box">
      <Toggle />
      <div id="board-list">
        <Routes>
          <Route index path="/" element={<ProjectList isWishPage={false} />} />
          <Route
            path="/private/*"
            element={
              <PrivateList
                dashBoardInfo={dashBoardInfo}
                setDashBoardInfo={setDashBoardInfo}
              />
            }
          >
            <Route
              path=""
              element={
                isHost ? (
                  <Post projectId={dashBoardInfo.host.projectId} />
                ) : (
                  <ProjectList isWishPage={true} wishList={dashBoardInfo} />
                )
              }
            ></Route>
            <Route
              path="waiting"
              element={<Waiting projectId={dashBoardInfo.host.projectId} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Board
