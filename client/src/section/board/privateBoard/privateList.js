import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
// require('dotenv').config()
import './privateList.css'
import Toggle from '../../../components/toggle/toggle'
import DreamButton from './dreamButton'

import { PRIVATE, CONTENT, CONTENT_LINK } from '../hardWord'
import { WAITING_USERS, WAITING_USERS_LINK } from '../hardWord'

const havePostAsHost = (obj) => {
  return obj.host.projectId > 0
}
axios.defaults.withCredentials = true
const PrivateList = ({
  setHasHost,
  hasHost,
  isLoggedIn,
  dashBoardInfo,
  setDashBoardInfo,
  setWishList,
}) => {
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) {
      navigation('/')
    }
    // console.log(process.env.REACT_APP_API__URL + '/myProjects')
    // ! http://localhost:4000/myProjects 로 GET요청을 보내고있는데, 서버에 myProjects를 받는 라우터가 없음

    await axios
      .get(process.env.REACT_APP_API__URL + '/myProjects', {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (havePostAsHost(data)) {
          setDashBoardInfo(data)
          setHasHost(true)
        } else {
          setWishList(data)
          setHasHost(false)
        }
      })
  }, [])

  return (
    <>
      <DreamButton
        hasHost={hasHost}
        postState={dashBoardInfo.host.start + dashBoardInfo.host.done}
      />
      {hasHost ? (
        <Toggle
          leftName={CONTENT}
          rightName={WAITING_USERS}
          leftLink={CONTENT_LINK}
          rightLink={WAITING_USERS_LINK}
          privateClass={PRIVATE}
        ></Toggle>
      ) : null}
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList
