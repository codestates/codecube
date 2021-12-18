/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import { CLICKED } from './toggle'

import './toggle.css'

const PrivateToggle = ({ isContent, toggling }) => {
  const content = useRef()
  const waitingUsers = useRef()

  useEffect(() => {
    if (!isContent) {
      content.current.classList.remove(CLICKED)
      waitingUsers.current.classList.add(CLICKED)
    } else {
      content.current.classList.add(CLICKED)
      waitingUsers.current.classList.remove(CLICKED)
    }
  }, [isContent])

  return (
    <div id="toggle-wrapper" style={{ maxWidth: '18rem' }}>
      <div
        ref={content}
        className="board-toggle clicked"
        onClick={() => toggling(content.current)}
      >
        본문
      </div>
      <div
        ref={waitingUsers}
        className="board-toggle"
        onClick={() => toggling(waitingUsers.current)}
      >
        대기인원
      </div>
    </div>
  )
}
export default PrivateToggle
