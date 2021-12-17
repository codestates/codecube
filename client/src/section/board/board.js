/* eslint-disable react/prop-types */

import React, { useState, useRef, useCallback } from 'react'
import './board.css'
import BoardCard from './boardCard'

const CLICKED = 'clicked'

const Board = () => {
  const [isPublicBoard, setIsPublicBoard] = useState(true)
  const [dummy, setDummy] = useState([
    { postId: 1, title: 'hello world', confirmed: 2 },
    { postId: 2, title: 'hello word', confirmed: 3 },
    { postId: 3, title: 'hello wood', confirmed: 1 },
  ])

  const publicBoard = useRef()
  const privateBoard = useRef()

  const onToggleClick = useCallback(
    (ref) => {
      const classList = Object.values(ref.classList)
      if (classList.includes(CLICKED)) {
        return
      }

      if (isPublicBoard) {
        publicBoard.current.classList.remove(CLICKED)
        privateBoard.current.classList.add(CLICKED)
      } else {
        privateBoard.current.classList.remove(CLICKED)
        publicBoard.current.classList.add(CLICKED)
      }

      setIsPublicBoard(!isPublicBoard)
    },
    [isPublicBoard]
  )

  return (
    <div id="board-wrapper">
      <div id="toggle-wrapper">
        <div
          ref={publicBoard}
          className="board-toggle clicked"
          onClick={() => onToggleClick(publicBoard.current)}
        >
          public
        </div>
        <div
          ref={privateBoard}
          className="board-toggle "
          onClick={() => onToggleClick(privateBoard.current)}
        >
          private
        </div>
      </div>
      <div id="board-list">
        {dummy.map((data) => {
          return (
            <BoardCard
              key={data.postId}
              title={data.title}
              confirmed={data.confirmed}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Board
