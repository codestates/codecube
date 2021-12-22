import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.location.replace(
      'https://github.com/login/oauth/authorize?client_id=ee3daaa275c5470135c4'
    )
  }
  return <input type="button" value="Githublogin" onClick={redirectUrl} />
}

export default GitHubLogin
