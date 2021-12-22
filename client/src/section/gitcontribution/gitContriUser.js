import React from 'react'

const GitContributionUser = (props) => {
  return (
    <div className="rowA h50A contribution">
      <div className="qh10A">git contribution</div>
      <div className="qh90A">잔디</div>
      {props.gitContri ? (
        <img src={props.gitContri}></img>
      ) : (
        <img src="https://ghchart.rshah.org/219138/codestate"></img>
      )}
    </div>
  )
}

export default GitContributionUser
