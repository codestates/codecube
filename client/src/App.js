import React, { useState } from 'react'

import AfterLogin from './section/login_profile/afterLogin'
import BeforeLogin from './section/login_profile/beforeLogin'

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
        <div className="row h50">git dist</div>
        <div className="row h50">notice</div>
      </div>
      <div className="col w30">
        <div className="board">public/private board</div>
      </div>
    </div>
  )
}

export default App
