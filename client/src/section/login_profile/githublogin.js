import dotenv from 'dotenv'
import React from 'react'
dotenv.config()

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    )
  }
  return <input type="button" value="Githublogin" onClick={redirectUrl} />
}

export default GitHubLogin
