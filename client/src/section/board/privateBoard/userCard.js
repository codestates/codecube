/* eslint-disable react/prop-types */
import React from 'react'

import '../card.css'

const UserCard = ({ id, image, name, onSelect }) => {
  return (
    <div className="card user-card">
      <div className="profile">
        <div className="dummy-image">{image}</div>
        <div className="username">{name}</div>
      </div>
      <div className="button-wrapper">
        <button onClick={() => onSelect(id)}>수락</button>
        <button onClick={() => onSelect(id)}>거절</button>
      </div>
    </div>
  )
}

export default UserCard
