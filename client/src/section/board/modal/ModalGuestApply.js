import React from 'react'
import './ModalGuestApply.css'

const ModalGuestApply = () => {
  return (
    <div id="container">
      <div className="row h10">
        <div className="title">타이틀</div>
      </div>
      <div className="row h80">
        <div className="content">본문</div>
      </div>
      <div className="row h10">
        <div className="col w50">
          <div>현재참여인원</div>
          <div className="accepted">
            <a className="h10" href="https://username">
              <img src="userimage.jpg" alt="accepted user" />
              username
            </a>
            <a className="h10" href="https://username">
              <img src="userimage.jpg" alt="accepted user" />
              username2
            </a>
          </div>
        </div>
        <div className="col w50 button">
          {/* <!-- <div class="button"> --> */}
          <input type="button" value="참여" />
          {/* <!-- <input type="button" value="대기"> -->
                <!-- </div> --> */}
        </div>
      </div>
    </div>
  )
}

export default ModalGuestApply
