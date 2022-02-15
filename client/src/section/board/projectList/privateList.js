import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'

import './privateList.css'

import DreamButton from './dreamButton'
import { getMyProject, handleSetIsHost } from '../../../actions/board'

const havePostAsHost = (obj) => {
  return obj.host.projectId > 0
}
axios.defaults.withCredentials = true
const PrivateList = ({ dashBoardInfo, setDashBoardInfo }) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) navigation('/')
    // dispatch(getMyProject())

    await axios
      .get(process.env.REACT_APP_API__URL + '/myProjects', {
        withCredentials: true,
      })
      .then(({ data }) => {
        setDashBoardInfo(data)
        if (havePostAsHost(data)) dispatch(handleSetIsHost())
      })
  }, [])

  return (
    <>
      <DreamButton postState={dashBoardInfo.host.start + dashBoardInfo.host.done} />
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList
