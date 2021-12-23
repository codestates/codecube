import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { v4 } from 'uuid'

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
        return (<>
          <tr key={index}>
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
    </>)
      })
    }
  }

  useEffect(() => {
    getJobList()
  }, [])

  useEffect(() => {
    jobsOnBoard()
  }, [])


//  return (
//    <div className="notice">
//      <input type="button" onClick={getJobList} value="공지개시판버튼"></input>
//      {/* <div>{EMPLMNT_INFO_URL}</div> */}
//      <table border="1" align="center" bordercolor="blue" bgcolor="red">
//        <thead>
//          <tr>
//            <th>제목</th>
//            <th>직업</th>
//            <th>마감일</th>
//          </tr>
//        </thead>
//        <tbody>{jobsOnBoard()}</tbody>
//      </table>
//      <div></div>
//    </div>

const noticeDummy = [
  { title: '안녕하세요 코드큐브입니다!', date: '2021.12.22', see: 100 },
  { title: '모두 보라!', date: '2021.12.22', see: 100 },
  { title: '미안하다 이거 보여주려고 어그로끌었다.. ', date: '2021.12.22', see: 100 },
  { title: '나루토 사스케 싸움수준 ㄹㅇ실화냐?', date: '2021.12.22', see: 100 },
  { title: '제가 LA에 있을 땐 말이죠', date: '2021.12.22', see: 100 },
  { title: '어버버버버법', date: '2021.12.22', see: 100 },
]

const NoticeBoard = () => {
  return (
    <>
      <div className="notice-h1">공지게시판</div>
      <div className="notice-content">
        {noticeDummy.map((v) => {
          return (
            <div className="notice-card" key={v4()}>
              <div className="notice-title">{v.title}</div>
              <div className="notice-meta">
                <div>{v.date}</div>
                <div>조회수: {v.see}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NoticeBoard
