/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './board.css'

import Toggle from '../../components/toggle/toggle'
import PublicList from './publicList'
import PrivateList from './privateList'

// ! 테스트용 더미
import publicDummy from '../../dummy/board/publicDummy'
import privateDummy from '../../dummy/board/privateDummy'

const Board = ({ isLoggedIn }) => {
  const [isPublicBoard, setIsPublicBoard] = useState(true)
  const [boardList, setBoardList] = useState(publicDummy)

  useEffect(() => {
    if (isPublicBoard) {
      setBoardList(publicDummy)
    } else {
      setBoardList(privateDummy)
    }
  }, [isPublicBoard])

  return (
    <div id="board-wrapper">
      <Toggle
        isPublicBoard={isPublicBoard}
        toggling={setIsPublicBoard}
        isLoggedIn={isLoggedIn}
      ></Toggle>
      <div id="board-list">
        {isPublicBoard ? (
          boardList.map((data) => {
            return (
              <PublicList
                key={data.postId}
                title={data.title}
                confirmed={data.confirmed}
                recruitment={data.recruitment}
                // 모집인원 4명으로 고정이긴 하지만, 혹시 바꿀 수 있으므로 편의를 위해 미리 만들어둠.
              />
            )
          })
        ) : (
          <PrivateList myPost={boardList[0]} />
        )}
      </div>
    </div>
  )
}

export default Board
