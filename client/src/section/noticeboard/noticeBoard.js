import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './noticeBoard.css'
require('dotenv').config()

axios.defaults.withCredentials = true
const openApi = process.env.REACT_APP_OPEN_API

const NoticeBoard = (props) => {
  const getJobList = () => {
    console.log('*******************')
    axios.get('http://localhost:4000/openapi/joblist').then((res) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', res.data)
    })
  }

  return (
    <div className="notice">
      <input type="button" onClick={getJobList} value="공지개시판버튼"></input>
      {/* <div>{getJobList}</div> */}
    </div>
  )
}

export default NoticeBoard
