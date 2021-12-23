import React, { useState } from 'react'
import { v4 } from 'uuid'
import './noticeBoard.css'

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
