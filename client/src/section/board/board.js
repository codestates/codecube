import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import PublicList from './publicBoard/publicList'
import PrivateList from './privateBoard/privateList'
import Post from './post/post'
import Waiting from './members/waiting'

// ! dummies
import waitingUserDummy from '../../dummy/board/waitingUserDummy'
import privateDummy from '../../dummy/board/privateDummy'
import confirmUsersDummy from '../../dummy/board/confirmUsersDummy'
import publicDummy from '../../dummy/board/publicDummy'

const PUBLIC_BOARD = '공개게시판'
export const PRIVATE_BOARD = '개인게시판'
const PRIVATE_LINK = '/private/myPost'

const havePostAsHost = (obj) => {
  return Object.keys(obj).length > 0
}

const initialState = {
  host: {},
  guest: {
    confirmed: {},
    wishList: [],
  },
}

const Board = ({ isLoggedIn }) => {
  const [publicList, setPublicList] = useState([{}])
  const [waitingUsers, setWaitingUsers] = useState([{}])
  const [confirmUsers, setConfirmUsers] = useState([{}])
  const [myPost, setMyPost] = useState(initialState)
  const [hasHost, setHasHost] = useState(true)

  useEffect(() => {
    console.log(hasHost)
    // ! 프론트 기능 구현에 초점이 맞춰져있음(실제 동작과 다름)
    // * 내가 게시글을 올린 사람인지 다른 게시글에 신청을 한 사람인지는 private dummy를 수정해서 바꿀 수 있음.
    if (havePostAsHost(privateDummy.host)) {
      setHasHost(true)
    } else {
      setHasHost(false)
    }
    setMyPost(privateDummy)
    setPublicList(publicDummy)
    setWaitingUsers(waitingUserDummy)
    setConfirmUsers(confirmUsersDummy)
  }, [hasHost])

  return (
    <div id="board-wrapper">
      <Toggle
        isLoggedIn={isLoggedIn}
        left={PUBLIC_BOARD}
        right={PRIVATE_BOARD}
        subLinkLeft=""
        subLinkRight={PRIVATE_LINK}
      />
      <div id="board-list">
        <Routes>
          <Route
            index
            path="/"
            element={<PublicList list={publicList} isWish={false} />}
          />
          <Route
            path="/private/*"
            element={<PrivateList hasHost={hasHost} isLoggedIn={isLoggedIn} />}
          >
            <Route
              path="myPost"
              element={<Post thisPost={myPost.host} confirmUsers={confirmUsers} />}
            />
            <Route
              path="wishList"
              element={<PublicList list={myPost.guest.wishList} isWish={true} />}
            />
            <Route
              path="waiting"
              element={
                <Waiting waitingUsers={waitingUsers} setWaitingUsers={setWaitingUsers} />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Board
