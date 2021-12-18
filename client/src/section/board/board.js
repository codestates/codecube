/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'

import './board.css'
import Toggle, { CLICKED } from '../../components/toggle/toggle'
import PublicList from './publicBoard/publicList'
import PrivateList from './privateBoard/privateList'

// ! 테스트용 더미
import publicDummy from '../../dummy/board/publicDummy'
import privateDummy from '../../dummy/board/privateDummy'

const Board = ({ isLoggedIn }) => {
  const [isPublicBoard, setIsPublicBoard] = useState(true)
  const [publicPosts, setPublicPosts] = useState([])
  const [privatePosts, setPrivatePosts] = useState([])

  useEffect(() => {
    if (isPublicBoard) {
      setPublicPosts(publicDummy)
    } else {
      setPrivatePosts(privateDummy)
    }
  }, [isPublicBoard])

  const toggling = useCallback(
    (e, ref) => {
      const classList = Object.values(ref.classList)
      if (classList.includes(CLICKED)) {
        return
      } else if (!isLoggedIn) {
        // 로그인 안된 상태면 개인게시판 클릭 이벤트를 막습니다.
        e.stopPropagation()
      } else {
        setIsPublicBoard(!isPublicBoard)
      }
    },
    [isPublicBoard]
  )

  return (
    <div id="board-wrapper">
      <Toggle isPublicBoard={isPublicBoard} toggling={toggling}></Toggle>
      <div id="board-list">
        {isPublicBoard ? (
          <PublicList publicPosts={publicPosts} />
        ) : (
          <PrivateList myPost={privatePosts} />
        )}
      </div>
    </div>
  )
}

export default Board
