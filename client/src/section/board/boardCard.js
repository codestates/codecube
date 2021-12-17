/* eslint-disable react/prop-types */

import React, { useMemo } from 'react'
import './boardCard.css'

const BoardCard = ({ title, confirmed }) => {
  return (
    <div id="card">
      title: {title}
      <br />
      confirmed: {confirmed}
    </div>
  )
}

export default BoardCard
