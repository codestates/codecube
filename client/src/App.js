import React, { useState } from 'react'
import Board from './section/board/board'

// import './index.css'

import AfterLogin from './section/login_profile/afterLogin'
import BeforeLogin from './section/login_profile/beforeLogin'
import GitContribution from './section/gitcontribution/gitContri'
import GitContributionUser from './section/gitcontribution/gitContriUser'
import NoticeBoard from './section/noticeboard/noticeBoard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div id="container">
      <div className="col w40">
        <div className="login">
          {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
        </div>
      </div>
      <div className="col w30">
        <div className="row h50">
          {isLoggedIn ? <GitContributionUser /> : <GitContribution />}
        </div>
        <div className="row h50">
          <NoticeBoard />
        </div>
      </div>
      <div className="col w30">
        <Board isLoggedIn={isLoggedIn} />
      </div>
    </div>
  )
}

export default App
