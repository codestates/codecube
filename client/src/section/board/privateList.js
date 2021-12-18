/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import BoardCard from './publicList'

import './privateList.css'
import UserCard from './userCard'

import waitingUserDummy from '../../dummy/board/waitingUserDummy'

const PrivateList = ({ myPost }) => {
  // ! 테스트용 더미 state
  const [waitingUsers, setWaitingUsers] = useState(waitingUserDummy)

  const confirmOrReject = useCallback(
    // 의존성을 안넣어주면 state의 변화를 인지하지 못함.
    // 즉, 의존성에 넣어준 정보의 변경만 감지하고 같이변화함.
    (id) => {
      console.log(id)
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
    },
    [waitingUsers]
  )

  return (
    <>
      <fieldset className="private-field">
        <legend>모집중</legend>
        <BoardCard
          key={myPost.postId}
          title={myPost.title}
          confirmed={myPost.confirmed}
          recruitment={myPost.recruitment}
        />
      </fieldset>
      <fieldset className="private-field waiting">
        <legend>신청 현황</legend>
        {waitingUsers.map((v) => {
          return (
            <UserCard
              key={v.userId}
              id={v.userId}
              image={'IMG'}
              name={v.username}
              onSelect={confirmOrReject}
            />
          )
        })}
      </fieldset>
    </>
  )
}

export default PrivateList
