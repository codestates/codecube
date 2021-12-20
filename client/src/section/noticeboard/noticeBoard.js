import React from 'react'
import './noticeBoard.css'

const NoticeBoard = () => {
  return (
    <div className="noticeA">
      <div className="noticeA qh10A">공지게시판</div>
      <table className="tableA qh90A">
        <thead className="label">
          <tr>
            <th>제목</th>
            {/* <!-- <th>작성자</th> --> */}
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2021</td>
          </tr>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2021</td>
          </tr>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NoticeBoard
