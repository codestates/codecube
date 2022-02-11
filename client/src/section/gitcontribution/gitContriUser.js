import React from 'react'
import './gitContri.css'
const GitContributionUser = (props) => {
  return (
    <div className="contribution">
      <div id="github-img-wrapper">
        <div className="greet">Github contribution</div>
      </div>
      {props.gitContri ? (
        <img className="empty-cont" src={props.gitContri}></img>
      ) : (
        <img
          className="empty-cont"
          src="https://ghchart.rshah.org/219138/codestate"
        ></img>
      )}
    </div>
  )
}

export default GitContributionUser
