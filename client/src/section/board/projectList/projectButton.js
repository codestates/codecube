import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

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

const ProjectButton = ({ postState }) => {
  const { isHost } = useSelector((state) => state.boardReducer)
  const [buttonName, setButtonName] = useState(P_CREATE)

  useEffect(() => {
    if (isHost && postState >= 1) {
      setButtonName(P_DONE)
    } else if (isHost && postState >= 0) {
      setButtonName(P_START)
    }
  }, [isHost, postState])

  const onDream = useCallback(() => {
    if (buttonName === P_CREATE) {
      // console.log('creating!')
    } else if (buttonName === P_START) {
      // console.log('starting!')
    } else {
      // console.log('done!!')
    }
  }, [buttonName])

  return <Button onClick={onDream}>{buttonName}</Button>
}

export default ProjectButton
