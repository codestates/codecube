import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  handleProjectDetail,
  PROJECT_DETAIL,
  setProjectInfo,
} from '../../actions/projectDetial'
import Content from './components/content'

export const BackDrop = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  backdrop-filter: blur(2px);
`

const ProjectDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onIndexPage = () => {
    navigate('/')
    window.localStorage.removeItem(PROJECT_DETAIL)
    dispatch(setProjectInfo({ title: '', content: '' }))
  }

  return (
    <BackDrop onClick={onIndexPage}>
      <Content />
    </BackDrop>
  )
}

export default ProjectDetail
