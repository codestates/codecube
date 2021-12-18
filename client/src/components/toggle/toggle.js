/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useEffect, useMemo } from 'react'

import './toggle.css'

const CLICKED = 'clicked'
// const NOT_LOGGED_IN = 'not-logged-in'

const Toggle = ({ isLoggedIn, isPublicBoard, toggling }) => {
  const publicBoard = useRef()
  const privateBoard = useRef()

  // useMemo(() => {
  //   if (!isLoggedIn) {
  //     privateBoard.current.classList.add(NOT_LOGGED_IN)
  //   } else {
  //     privateBoard.current.classList.remove(NOT_LOGGED_IN)
  //   }
  // }, [isLoggedIn])

  const onToggleClick = useCallback(
    (ref, e) => {
      const classList = Object.values(ref.classList)
      if (classList.includes(CLICKED)) {
        return
      }

      if (!isLoggedIn && ref === privateBoard.current) {
        // 로그인 안된 상태면 개인게시판 클릭 이벤트를 막습니다.
        console.log('Pleas Login First')
        e.stopPropagation()
        return
      }

      if (isPublicBoard) {
        publicBoard.current.classList.remove(CLICKED)
        privateBoard.current.classList.add(CLICKED)
      } else {
        privateBoard.current.classList.remove(CLICKED)
        publicBoard.current.classList.add(CLICKED)
      }
      toggling(!isPublicBoard)
    },
    [isPublicBoard]
  )

  return (
    <div id="toggle-wrapper">
      <div
        ref={publicBoard}
        className="board-toggle clicked"
        onClick={(e) => onToggleClick(publicBoard.current, e)}
      >
        public
      </div>
      <div
        ref={privateBoard}
        className="board-toggle"
        onClick={(e) => onToggleClick(privateBoard.current, e)}
      >
        private
      </div>
    </div>
  )
}

export default Toggle
