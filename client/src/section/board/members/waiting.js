import React, { useCallback } from 'react'
import { v4 } from 'uuid'

import './waiting.css'

const Waiting = ({ waitingUsers, setWaitingUsers }) => {
  const onSelect = useCallback(
    (id) => {
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
    },
    [waitingUsers]
  )

  return (
    <div id="waiting-wrapper">
      {waitingUsers.map(({ img, username, userId }) => {
        return (
          <div key={v4()} className="waiting-card">
            <div className="waiting-profile">
              <div className="waiting-dummy-image">img</div>
              <div className="waiting-username">{username}</div>
            </div>
            <div className="waiting-button-wrapper">
              <button onClick={() => onSelect(userId)}>✔️</button>
              <button onClick={() => onSelect(userId)}>✖️</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Waiting
