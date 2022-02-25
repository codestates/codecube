import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'

import ProjectButton from './projectButton'
import { getMyProject } from '../../../../src/actions/board'
import styled from 'styled-components'

axios.defaults.withCredentials = true

const PrivateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
`

const PrivateList = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const { myProject } = useSelector((state) => state.boardReducer)

  const dispatch = useDispatch()
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) {
      navigation('/')
    } else {
      dispatch(getMyProject())
    }
  }, [isLoggedIn])

  return (
    <>
      <ProjectButton />
      <PrivateWrapper>
        <Outlet />
      </PrivateWrapper>
    </>
  )
}

export default PrivateList
