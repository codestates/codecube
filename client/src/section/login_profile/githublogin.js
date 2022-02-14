import React from 'react'

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    // window.location.replace(
    //   `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    // )
  }
  return <div className="githublogo-s" onClick={redirectUrl}></div>
}

export default GitHubLogin
