import React from 'react'
import './ModalHostCreate.css'

const ModalHostCreate = () => {
  return (
    <div id="container">
      <div className="row h10">
        <div className="title">타이틀</div>
      </div>
      <div className="row h80">
        <div className="content w50">본문</div>
      </div>
      <div className="row h10">
        <div className="confirmed">
          <input className="button" type="button" value="게시물생성버튼" />
        </div>
      </div>
    </div>
  )
}

export default ModalHostCreate
