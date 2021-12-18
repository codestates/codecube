/* eslint-disable react/prop-types */

import React from 'react'
import './card.css'

const PublicList = ({ title, confirmed, recruitment }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        참가 인원: {confirmed} / {recruitment}
      </div>
    </div>
  )
}

export default PublicList
