import React from 'react'
import styled from 'styled-components'
import './beforeLogin.css'

const Login = styled.div`
  width: 100%;
  height: 100%;
`

const BeforeLogin = () => {
  return (
    // <Login>
    //   <div>로그인 화면이 있다고 가정.</div>
    // </Login>
    <div id="container">
      <div class="col w30">
        <div class="login">
          <div class= "lo01 th50 login01">
            <div class="zh20 codecubelogo">
              <img class="codeimage" src="https://cdn.discordapp.com/attachments/919772630255534083/921018331471945778/unknown.png" alt=""/>
            </div>
            <div class="zh80">
              <form class="loginform" action="">
                <input type="text" placeholder="id"></input>
                <input type="password" placeholder="password"></input>
                <input type="submit" value="login"></input>
              </form>

            </div>

          </div>
          <div class="lo02 th50 login02">
            <div class="zh40 snslogolist">
              <a href="https://www.google.com">
                <img class="snslogo zw10" src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png" alt="googlelogo"/>
              </a>
              <a href="https://www.naver.com/">
                <img class="snslogo zw10" src="https://i2.wp.com/bwithmag.com/wp-content/uploads/2018/06/2%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5-N-%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.jpg?fit=526%2C527" alt="naverlogo"/>
              </a>

            </div>
            <div class="zh40">소셜로그인</div>

            <input class="zh20 signup " type="button" value="signup" ></input>


          </div>
        
        </div>
        
      </div>
      <div class="col w30">
        <div class="row h50">
          <div class="qh10">git contribution</div>
          <div class="qh90">잔디</div>
        </div>
        <div class="row h50">
          <div class="qh10">공지게시판</div>
          <table class="table qh90">
            <thead class="label">
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
              <tr>
                <td>제목이다</td>
                {/* <!-- <td>작성자이다룰루</td> --> */}
                <td>2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col w40">
        <div class="board">
          {/* <!-- 테이블에서 <tr> 태그는 한 줄을 뜻합니다. 



            그래서  만약 <tr> 태그가 3개면 3줄이 표현이 되는 것이죠. 
             -->
             */}
          <div class="board01 qh10">공개 게시판</div>
          <table class="table qh90">
            <thead class="label">
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

        </div>
            
      </div>
    </div>
  )
}

export default BeforeLogin
