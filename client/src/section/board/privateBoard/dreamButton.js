import React, { useCallback, useEffect, useState } from 'react'

const P_CREATE = '프로잭트 생성'
const P_START = '프로젝트 시작'
const P_DONE = '프로젝트 종료'

const DreamButton = ({ hasHost, postState }) => {
  const [buttonName, setButtonName] = useState(P_CREATE)

  useEffect(() => {
    if (hasHost && postState >= 1) {
      setButtonName(P_DONE)
    } else if (hasHost && postState >= 0) {
      setButtonName(P_START)
    }
  }, [hasHost, postState])

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
    <button id="dream-button" onClick={onDream}>
      {buttonName}
    </button>
  )
}

export default DreamButton
