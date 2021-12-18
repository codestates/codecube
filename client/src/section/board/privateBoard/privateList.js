/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'

import '../card.css'

import { CLICKED } from '../../../components/toggle/toggle'
import PrivateToggle from '../../../components/toggle/privateToggle'

import waitingUserDummy from '../../../dummy/board/waitingUserDummy'
import Post from '../post'

const PrivateList = ({ myPost }) => {
  // ! 테스트용 더미 state
  const [waitingUsers, setWaitingUsers] = useState(waitingUserDummy)
  const [isContent, setIsContent] = useState(true)

  const confirmOrReject = useCallback(
    // * 해당 함수 Post 컴포넌트에서 사용하면 좋을 듯함
    (id) => {
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
    },
    [waitingUsers]
  )

  const toggling = useCallback(
    (ref) => {
      const classList = Object.values(ref.classList)
      if (classList.includes(CLICKED)) {
        return
      }
      setIsContent(!isContent)
    },
    [isContent]
  )

  const { title, confirmed, recruitment, content } = myPost[0] ?? []

  return (
    <>
      <PrivateToggle isContent={isContent} toggling={toggling} />
    </>
  )
}

export default PrivateList
