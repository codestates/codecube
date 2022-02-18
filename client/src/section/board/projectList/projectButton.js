import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProject, handleSetIsNotHost } from '../../../actions/board.js'
import styled from 'styled-components'
const serverUrl = process.env.REACT_APP_API__URL

const P_CREATE = '프로잭트 생성'
const P_START = '프로젝트 시작'
const P_DONE = '프로젝트 종료'

const Button = styled.div`
  position: absolute;

  width: 7rem;
  right: 1.5rem;
  bottom: 10px;

  background-color: rgb(91, 192, 222);
  box-shadow: 1px 1px 2px white, -1px -1px 2px #cbced1;
  padding: 0.3rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.7rem;

  cursor: pointer;
`

const ProjectButton = () => {
  const { isHost, myProject } = useSelector((state) => state.boardReducer)
  const [buttonName, setButtonName] = useState(P_CREATE)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isHost && myProject.host.start >= 1) {
      setButtonName(P_DONE)
    } else if (isHost && myProject.host.start >= 0) {
      setButtonName(P_START)
    }
  }, [isHost, myProject])

  const onDream = useCallback(() => {
    if (buttonName === P_CREATE) {
      console.log('creating!')
    } else if (buttonName === P_START) {
      axios
        .put(serverUrl + '/projects/' + myProject.host.projectId + '/start')
        .then((data) => {
          dispatch(getMyProject())
          alert('프로젝트가 시작되었습니다')
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert('이미 시작된 프로젝트 입니다')
          } else {
            console.log(err)
          }
        })
    } else {
      axios
        .put(serverUrl + '/projects/' + myProject.host.projectId + '/done')
        .then((data) => {
          dispatch(handleSetIsNotHost())
          alert('프로젝트가 종료되었습니다')
        })
        .catch((err) => {
          if (err.response.data.message === 'This project has to be started first') {
            console.log(err.response)
            alert('아직 시작 전인 프로젝트입니다')
          } else if (err.response.data.message === 'This project has already been done') {
            console.log(err.response)
            dispatch(handleSetIsNotHost())
            alert('이미 종료된 프로젝트입니다')
          } else {
            console.log(err)
          }
        })
    }
  }, [buttonName])

  return <Button onClick={onDream}>{buttonName}</Button>
}

export default ProjectButton
