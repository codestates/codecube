import dotenv from 'dotenv'
import React from 'react'
dotenv.config()

const GitHubLogin = (props) => {
  const redirectUrl = () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    )
  }
  return (
    <>
      <img
        className="githublogo-s"
        src="https://png2.cleanpng.com/sh/53cbe11528546f6886d15a85830b7c74/L0KzQYm3VsI5N6R2h5H0aYP2gLBuTfdqfJl6ep97ZYDyg7r7jCJ6NaF3h9l7YX3wdcO0kB9nfKhmitc2ZHX5db32kPVzNWZnS6YDMUa8dLTsgcExNmI1SKgCMUS5QYa6UME3P2c6T6s5NEmxgLBu/kisspng-github-repository-programmer-software-developer-5b348169dcea10.1006714615301676579049.png"
        onClick={redirectUrl}
      ></img>
      <img
        className="hat-s"
        src="https://png2.cleanpng.com/sh/6b9917d5009eb044e9f8cb1a67bb2d20/L0KzQYi4UsA3N5Y8fJGAYUK7coW4gcNnPGQ4TJCAMUC2Q4a6WME2OWM7SagEOEa1RYq4TwBvbz==/5a28b41a3f4334.5103353815126169862591.png"
      ></img>
    </>
  )
}

export default GitHubLogin

{
  /* <input className="mypage-btn" type="button" value="Github Login" onClick={redirectUrl} />  */
}
