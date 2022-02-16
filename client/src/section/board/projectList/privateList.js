import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'

import './privateList.css'

import DreamButton from './dreamButton'
import { getMyProject } from '../../../actions/board'

axios.defaults.withCredentials = true
const PrivateList = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const { myProject } = useSelector((state) => state.boardReducer)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) navigation('/')
    dispatch(getMyProject())
  }, [])

  return (
    <>
      <DreamButton postState={myProject.host.start + myProject.host.done} />
      <div id="private-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default PrivateList
