import React from 'react'
import { Outlet } from 'react-router-dom'

import './privateList.css'
import Toggle from '../../../components/toggle/toggle'

const CONTENT = '본문'
const WAITING_USERS = '신청자'
const CONTENT_LINK = ''
const WAITING_USERS_LINK = 'waiting'
const PRIVATE = 'private'

const PrivateList = ({ hasHost }) => {
  return (
    <>
      <button id="dream-button">프로젝트 생성</button>
      {hasHost ? (
        <Toggle
          left={CONTENT}
          right={WAITING_USERS}
          subLinkLeft={CONTENT_LINK}
          subLinkRight={WAITING_USERS_LINK}
          isPrivate={PRIVATE}
        ></Toggle>
      ) : null}
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList
