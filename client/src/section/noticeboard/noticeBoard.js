import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './noticeBoard.css'
require('dotenv').config()

axios.defaults.withCredentials = true
const openApi = process.env.REACT_APP_OPEN_API

//JOBOFFR_CERTFIY_NO

const NoticeBoard = (props) => {
  const [jobListData, setJoblistData] = useState([])
  const getJobList = async () => {
    console.log('*******************')
    await axios.get('http://localhost:4000/openapi/joblist').then((res) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', res.data)
      setJoblistData(res.data)
    })
  }
  const jobsOnBoard = () => {
    {
      jobListData.map((ele, index) => {
        ;<tr key={index}>
          <td key={index} onClick={ele.EMPLMNT_INFO_URL}>
            {ele.EMPLMNT_TITLE}
          </td>
          <td key={index} onClick={ele.EMPLMNT_INFO_URL}>
            {ele.JOBCLASS_DIV_NM}
          </td>
          <td key={index} onClick={ele.EMPLMNT_INFO_URL}>
            {ele.CLOS_DE_INFO}
          </td>
        </tr>
      })
    }
  }

  useEffect(() => {
    getJobList()
  }, [])

  useEffect(() => {
    jobsOnBoard()
  }, [])

  return (
    <div className="notice">
      <input type="button" onClick={getJobList} value="공지개시판버튼"></input>
      {/* <div>{EMPLMNT_INFO_URL}</div> */}
      <table border="1" align="center" bordercolor="blue" bgcolor="red">
        <thead>
          <tr>
            <th>제목</th>
            <th>직업</th>
            <th>마감일</th>
          </tr>
        </thead>
        <tbody>{jobsOnBoard()}</tbody>
      </table>
      <div></div>
    </div>
  )
}

export default NoticeBoard
