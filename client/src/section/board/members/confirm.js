import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'

import './confirm.css'
import axios from 'axios'

axios.defaults.withCredentials = true
const ConfirmUsers = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [confirmUsers, setConfirmUsers] = useState([])

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/members/' + myProject.host.projectId, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setConfirmUsers(data.confirmed)
      })
  }, [])

  return (
    <div className="confirm-wrapper">
      {confirmUsers.map((user) => {
        return (
          <div key={v4()} className="user-wrapper">
            {/* <img className="user-profile" src={user.img}></img> */}
            <div className="user-profile">{user.image}</div>
            <div>{user.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ConfirmUsers
