import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { v4 } from 'uuid'

import './noticeBoard.css'
require('dotenv').config()

// const openApi = process.env.REACT_APP_OPEN_API
axios.defaults.withCredentials = true
const NoticeBoard = () => {
  const [jobListData, setJoblistData] = useState([{}])
  const getJobList = async () => {
    await axios
      .get(REACT_APP_API__URL + '/openapi/joblist', {
        withCredentials: true,
      })
      .then((res) => {
        setJoblistData(res.data)
      })
  }

  useEffect(() => {
    getJobList()
  }, [])

  return (
    <>
      <div className="notice-h1">채용 공고</div>
      <div className="notice-content">
        {jobListData.map((v) => {
          return (
            <a key={v4()} href={v.EMPLMNT_INFO_URL} id="notice-a">
              <div className="notice-card">
                <div className="notice-meta">
                  <div>{v.EMPLMNT_TITLE}</div>
                  <div>{v.JOBCLASS_DIV_NM}</div>
                </div>
                <div>마감일: {v.CLOS_DE_INFO}</div>
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}

export default NoticeBoard
