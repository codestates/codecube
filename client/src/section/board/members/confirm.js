import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import './confirm.css'
import confirmUsersDummy from '../../../dummy/board/confirmUsersDummy'

const ConfirmUsers = ({ postId }) => {
  const [confirmUsers, setConfirmUsers] = useState([])

  useEffect(() => {
    // TODO: API
    setConfirmUsers(confirmUsersDummy)
  }, [postId])

  return (
    <div className="confirm-wrapper">
      {confirmUsers.map((user) => {
        return (
          <div key={v4()} className="user-wrapper">
            <img className="user-profile" src={user.img}></img>
            <div>{user.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ConfirmUsers
