import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import './waiting.css'

import { ACCEPT, REJECT } from '../hardWord'

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

axios.defaults.withCredentials = true
const Waiting = ({ hasHost, projectId }) => {
  const [waitingUsers, setWaitingUsers] = useState([])
  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    if (!hasHost && location.pathname.includes('/waiting')) {
      navigation('/')
    } else {
      // TODO: API
      axios
        .get(
          'http://ec2-3-35-234-157.ap-northeast-2.compute.amazonaws.com' +
            '/members/' +
            projectId,
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          setWaitingUsers(data.waiting)
        })
    }
  }, [hasHost])

  const onSelect = useCallback(
    (id, type, proId) => {
      const change = waitingUsers.filter((user) => {
        return user.userId !== id
      })
      setWaitingUsers(change)
      // TODO: API
      if (type === ACCEPT) {
        axios.put(
          'http://ec2-3-35-234-157.ap-northeast-2.compute.amazonaws.com' +
            '/members/join',
          { userId: id, projectId: proId },
          {
            withCredentials: true,
          }
        )
      } else {
        axios.delete(
          'http://ec2-3-35-234-157.ap-northeast-2.compute.amazonaws.com' +
            '/members/' +
            id +
            '-' +
            proId,
          {
            withCredentials: true,
          }
        )
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
