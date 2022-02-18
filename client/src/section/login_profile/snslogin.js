import React from 'react'

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.localStorage.setItem('gitcode', 'git')
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    )
  }
  return (
    <img
      className="githublogo-s"
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
      onClick={redirectUrl}
    ></img>
  )
}

const NaverLogin = (props) => {
  const redirectUrl = () => {
    window.localStorage.setItem('gitcode', 'nonegit')
    window.location.replace(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.REACT_APP_SNS}`
    )
  }
  return (
    <img
      className="githublogo-s"
      src="https://cdn.discordapp.com/attachments/919772630255534083/943766293474062387/EB84A4EC9DB4EBB284E3889C_EBA19CEAB3A0.png"
      onClick={redirectUrl}
    ></img>
  )
}

const KakaoLogin = (props) => {
  const redirectUrl = () => {
    window.localStorage.setItem('gitcode', 'nonegit')
    window.location.replace(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_SNS}&response_type=code`
    )
  }
  return (
    <img
      className="githublogo-s"
      src="https://cdn.discordapp.com/attachments/919772630255534083/943766878642372668/kakao.png"
      onClick={redirectUrl}
    ></img>
  )
}

export { GitHubLogin, NaverLogin, KakaoLogin }
