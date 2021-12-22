/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import './giContri.css'

const GitContributionUser = (props) => {
  console.log('@@@@@@', props.gitContri)
  return (
    <div className="rowA h50A contribution">
      <div className="qh10A">git contribution</div>
      <div className="qh90A">잔디</div>
      <img src={props.gitContri}></img>
    </div>
  )
}

export default GitContributionUser
