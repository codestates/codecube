import React from 'react'

const NoticeBoard = () =>{
    return (
        <table className="table qh90">
        <thead className="label">
          <tr>
            <th>제목</th>
            {/* <!-- <th>작성자</th> --> */}
            <th>대기인원</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제목입니다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2조회수</td>
          </tr>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2조회수</td>
          </tr>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2조회수</td>
          </tr>
          <tr>
            <td>제목이다</td>
            {/* <!-- <td>작성자이다룰루</td> --> */}
            <td>2조회수</td>
          </tr>
        </tbody>
      </table>
    )
}

export default NoticeBoard