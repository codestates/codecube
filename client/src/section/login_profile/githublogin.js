import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
require('dotenv').config()

const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
// const client_secret = process.env.GITHUB_CLIENT_SECRET

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    )
  }

  return <input type="button" value="Githublogin" onClick={redirectUrl} />
}

export default GitHubLogin
