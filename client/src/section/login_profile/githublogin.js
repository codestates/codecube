import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
<<<<<<< HEAD
=======
require('dotenv').config()

// const client_id = process.env.GITHUB_CLIENT_ID
// const client_secret = process.env.GITHUB_CLIENT_SECRET
>>>>>>> 305e42ccf38e2034b7d1aa4b36ade9b41570455e

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.location.replace(
<<<<<<< HEAD
      'https://github.com/login/oauth/authorize?client_id=ee3daaa275c5470135c4'
=======
      'https://github.com/login/oauth/authorize?client_id=1386659d2aaad143ab19'
>>>>>>> 305e42ccf38e2034b7d1aa4b36ade9b41570455e
    )
  }

  return <input type="button" value="Githublogin" onClick={redirectUrl} />
}

export default GitHubLogin
