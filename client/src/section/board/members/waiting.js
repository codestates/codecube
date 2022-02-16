import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 } from 'uuid'

import './waiting.css'
import { ACCEPT, REJECT } from '../../../extra/hardWord'

axios.defaults.withCredentials = true
const Waiting = () => {
  const { isHost, myProject } = useSelector((state) => state.boardReducer)
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

  const [waitingUsers, setWaitingUsers] = useState([])
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) {
      navigation('/')
    } else {
      if (isHost) {
        await axios
          .get(process.env.REACT_APP_API__URL + '/members/' + myProject.host.projectId, {
            withCredentials: true,
          })
          .then(({ data }) => {
            setWaitingUsers(data.waiting)
          })
      }
    }
  }, [isHost, isLoggedIn])

  const onSelect = useCallback((userId, type, projectId) => {
    setWaitingUsers((prevState) => prevState.filter((user) => user.userId !== userId))

    if (type === ACCEPT) {
      axios.put(
        process.env.REACT_APP_API__URL + '/members/join',
        { userId, projectId },
        {
          withCredentials: true,
        }
      )
    } else {
      axios.delete(
        process.env.REACT_APP_API__URL + '/members/' + userId + '-' + projectId,
        {
          withCredentials: true,
        }
      )
    }
  }, [])

  return (
    <div id="waiting-wrapper">
      {!isHost ? (
        <div>작성한 게시글이 없습니다</div>
      ) : (
        waitingUsers.map(({ username, userId, projectId }) => {
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
        })
      )}
    </div>
  )
}

export default Waiting
