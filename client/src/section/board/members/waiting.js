import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import './waiting.css'

import { ACCEPT, REJECT } from '../../../extra/hardWord'

import axios from 'axios'

axios.defaults.withCredentials = true
const Waiting = ({ hasHost, projectId }) => {
  const [waitingUsers, setWaitingUsers] = useState([])
  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    // ! 수정 필요함. 여기서 hasHost를 true로 만든것과 같은 결과가 나와야함.
    // if (!hasHost && location.pathname.includes('/waiting')) {
    //   navigation('/')
    // } else {
    //   axios
    //     .get(process.env.REACT_APP_API__URL + '/members/' + projectId, {
    //       withCredentials: true,
    //     })
    //     .then(({ data }) => {
    //       setWaitingUsers(data.waiting)
    //     })
    // }
  }, [hasHost])

  const onSelect = useCallback(
    (id, type, proId) => {
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
      if (type === ACCEPT) {
        axios.put(
          process.env.REACT_APP_API__URL + '/members/join',
          { userId: id, projectId: proId },
          {
            withCredentials: true,
          }
        )
      } else {
        axios.delete(process.env.REACT_APP_API__URL + '/members/' + id + '-' + proId, {
          withCredentials: true,
        })
      }
    },
    [waitingUsers]
  )

  return (
    <div id="waiting-wrapper">
      {waitingUsers.map(({ username, userId, projectId }) => {
        return (
          <div key={v4()} className="waiting-card">
            <div className="waiting-profile">
              <div className="waiting-dummy-image"></div>
              <div className="waiting-username">{username}</div>
            </div>
            <div className="waiting-button-wrapper">
              <button id="gotcha" onClick={() => onSelect(userId, ACCEPT, projectId)}>
                ✔️
              </button>
              <button id="del" onClick={() => onSelect(userId, REJECT, projectId)}>
                ✖️
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Waiting
