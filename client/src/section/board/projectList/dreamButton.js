import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const P_CREATE = '프로잭트 생성'
const P_START = '프로젝트 시작'
const P_DONE = '프로젝트 종료'

const DreamButton = ({ postState }) => {
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
      console.log('creating!')
    } else if (buttonName === P_START) {
      console.log('starting!')
    } else {
      console.log('done!!')
    }
  }, [buttonName])

  return (
    <div id="dream-button" onClick={onDream}>
      {buttonName}
    </div>
  )
}

export default DreamButton
