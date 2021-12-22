import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import './waiting.css'

import waitingUserDummy from '../../../dummy/board/waitingUserDummy'
import { ACCEPT, hoToken, localhost, REJECT } from '../hardWord'
import axios from 'axios'

const Waiting = ({ hasHost, projectId }) => {
  const [waitingUsers, setWaitingUsers] = useState([])
  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    if (!hasHost && location.pathname.includes('/waiting')) {
      navigation('/')
    } else {
      // TODO: API
      axios.get(`${localhost}/members/${projectId}`).then(({ data }) => {
        setWaitingUsers(data.waiting)
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
      {waitingUsers.map(({ image, username, userId }) => {
        return (
          <div key={v4()} className="waiting-card">
            <div className="waiting-profile">
              <div className="waiting-dummy-image">{image}</div>
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
