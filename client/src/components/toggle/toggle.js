/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import './toggle.css'

export const CLICKED = 'clicked'

const Toggle = ({ isPublicBoard, toggling }) => {
  const publicBoard = useRef()
  const privateBoard = useRef()

  // useEffect(() => {
  //   if (!isPublicBoard) {
  //     publicBoard.current.classList.remove(CLICKED)
  //     privateBoard.current.classList.add(CLICKED)
  //   } else {
  //     privateBoard.current.classList.remove(CLICKED)
  //     publicBoard.current.classList.add(CLICKED)
  //   }
  // }, [isPublicBoard])

  return (
    <Routes>
      <Route>
        {/* <div id="toggle-wrapper">
        <div
          ref={publicBoard}
          className="board-toggle clicked"
          onClick={(e) => toggling(e, publicBoard.current)}
        >
          공개 게시판
        </div> */}
      </Route>
      <Route>
        {/* <div
          ref={privateBoard}
          className="board-toggle"
          onClick={(e) => toggling(e, privateBoard.current)}
        >
          개인 게시판
        </div>
      </div> */}
      </Route>
    </Routes>
  )
}

export default Toggle
