import React from 'react'
import { v4 } from 'uuid'

import './confirm.css'

const ConfirmUsers = ({ confirmUsers }) => {
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
