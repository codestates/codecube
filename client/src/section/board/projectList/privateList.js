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
    // console.log('동기지만')
    // console.log('await를 만나는순간')
    dispatch(getMyProject())

    // console.log('제어권을 넘김')
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
