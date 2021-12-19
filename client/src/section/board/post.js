import React, { useState, useEffect, useRef, useCallback } from 'react'
import { v4 } from 'uuid'

import './post.css'

// ! dummies
import privateDummy from '../../dummy/board/privateDummy'
import waitingUserDummy from '../../dummy/board/waitingUserDummy'

const Post = () => {
  const [myPost, setMyPost] = useState([{}])
  const [waitingUsers, setWaitingUsers] = useState([{}])

  const contentWrapper = useRef()
  const buttonBackdrop = useRef()
  const showAllButton = useRef()

  useEffect(() => {
    setMyPost(privateDummy)
    setWaitingUsers(waitingUserDummy)
  })

  const showAll = useCallback(() => {
    contentWrapper.current.classList.remove('limit')
    buttonBackdrop.current.classList.add('hidden')
    showAllButton.current.classList.add('hidden')
  }, [])
  const { title, content } = myPost[0]

  return (
    <>
      <div ref={contentWrapper} className="content-wrapper limit">
        <h1>{title}</h1>
        <div className="content">{content}</div>
        <div ref={buttonBackdrop} className="button-backdrop">
          <button ref={showAllButton} className="show-all" onClick={showAll}>
            모두보기
          </button>
        </div>
      </div>
      <div className="confirm-wrapper">
        {waitingUsers.map((user) => {
          return (
            <div key={v4()} className="user-wrapper">
              <img className="user-profile" src={user.img}></img>
              <div>{user.username}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Post
