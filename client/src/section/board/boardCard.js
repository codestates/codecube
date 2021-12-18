/* eslint-disable react/prop-types */

import React from 'react'
import './boardCard.css'

const BoardCard = ({ title, confirmed, recruitment }) => {
  return (
    <div id="card">
      <h3>{title}</h3>
      <div>
        참가 인원: {confirmed} / {recruitment}
      </div>
    </div>
  )
}

export default BoardCard
