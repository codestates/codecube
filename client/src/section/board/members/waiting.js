import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import './waiting.css'

import waitingUserDummy from '../../../dummy/board/waitingUserDummy'
import { ACCEPT, hoToken, REJECT } from '../hardWord'
import axios from 'axios'

const Waiting = ({ hasHost, postId }) => {
  const [waitingUsers, setWaitingUsers] = useState([])
  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    if (!hasHost && location.pathname.includes('/waiting')) {
      navigation('/')
    } else {
      // TODO: API
      axios
        .get('http://localhost:4000/members/3', {
          headers: { Authorization: `bearer ${hoToken}` },
        })
        .then(({ data }) => {
          console.log(data)
          setWaitingUsers(data.confirmed)
        })
    }
  }, [hasHost])

  const onSelect = useCallback(
    (id, type) => {
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
      // TODO: API
      if (type === ACCEPT) {
      } else {
      }
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
              <button onClick={() => onSelect(userId, ACCEPT)}>✔️</button>
              <button onClick={() => onSelect(userId, REJECT)}>✖️</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Waiting
