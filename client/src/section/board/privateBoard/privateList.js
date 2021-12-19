/* eslint-disable react/prop-types */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Toggle from '../../../components/toggle/toggle'

// import Post from '../post'
import './privateList.css'

const CONTENT = '본문'
const WAITING_USERS = '신청자'
const CONTENT_LINK = ''
const WAITING_USERS_LINK = 'waiting'
const PRIVATE = 'private'

const PrivateList = () => {
  return (
    <>
      <Toggle
        left={CONTENT}
        right={WAITING_USERS}
        subLinkLeft={CONTENT_LINK}
        subLinkRight={WAITING_USERS_LINK}
        isPrivate={PRIVATE}
      ></Toggle>
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList

//  * 해당 함수 Post 컴포넌트에서 사용하면 좋을 듯함
// const confirmOrReject = useCallback(
//   (id) => {
//     const change = waitingUsers.filter((user) => {
//       return user.userId !== id
//     })
//     setWaitingUsers(change)
//   },
//   [waitingUsers]
// )
