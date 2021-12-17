import React from 'react'
import './ModalHost.css'

const ModalHost = () => {
  return (
    <div id="container">
      <div className="row h10">
        <div className="title">타이틀</div>
      </div>
      <div className="row h80">
        <div className="w50">
          <div className="content wh90">본문</div>
          <div className="confirmed wh10">
            <div>현재참여인원</div>
            <a href="userpage">
              <img className="snslogo zw10" src="" alt="user01" />
              username
            </a>
          </div>
        </div>
        <div className="waitinglist w50">
          <div>대기인원</div>
          <a href="userpage">
            <img className="snslogo zw10" src="user02" alt="user02" />
            username
          </a>
          <div className="button">
            <input className="h10" type="button" value="approved" />
            <input className="h10" type="button" value="rejected" />
          </div>
        </div>
      </div>
      <div className="start-complete h10">
        <input className="button02 h10" type="button" value="start" />
        <input className="button02 h10" type="button" value="complete" />
      </div>
    </div>
  )
}

export default Modalhost
