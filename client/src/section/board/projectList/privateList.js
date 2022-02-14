import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './privateList.css'
import Toggle from '../../../components/toggle/toggle'
import DreamButton from './dreamButton'

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
}) => {
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) navigation('/')

    await axios
      .get(process.env.REACT_APP_API__URL + '/myProjects', {
        withCredentials: true,
      })
      .then(({ data }) => {
        setDashBoardInfo(data)
        if (havePostAsHost(data)) setHasHost(true)
      })
  }, [])

  return (
    <>
      <DreamButton
        hasHost={hasHost}
        postState={dashBoardInfo.host.start + dashBoardInfo.host.done}
      />
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList
