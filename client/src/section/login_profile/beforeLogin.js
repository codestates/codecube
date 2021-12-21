import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import './beforeLogin.css'
import Signup from './components/signup'
import SnsLogin from './components/snslogin'
import Login from './components/login'
import profileDummy from '../../dummy/userinfo/profileDummy'

// const Login01 = styled.div`
//   width: 100%;
//   height: 100%;
// `

const BeforeLogin = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value })
  }
  const handleLogin = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    const { email, password } = loginInfo
    const result = profileDummy.filter((ele) => {
      ele.email === email && ele.password === password
    })
    console.log(profileDummy)
    console.log(result)
    console.log(loginInfo)

    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요')
    } else {
      //   const result = profileDummy.map((ele)=>{
      //     if(ele.email === email && ele.password===password){
      //         return ele
      //     }

      // })

      if (result) {
        //   axios.post('https://localhost:4000/signin',loginInfo)
        //   .then(res=>{
        //     // console.log("로그인후받아온쿠키???", res);
        //     handleResponseSuccess()
        //   })
        //   .catch(err=>{
        //     console.log(err)
        //     alert('사용자정보가 없습니다.')
        //   })

        alert('로그인성공')
      } else {
        alert('사용자정보가 없습니다.')
      }
    }
  }

  return (
    // <Login>
    //   <div>로그인 화면이 있다고 가정.</div>
    // </Login>
    <div>
      {/* 여기에 뭔가 써있어야함다
        {Login} */}
      <div className="login">
        <div className="lo01 th50 login01">
          <div className="zh20 codecubelogo">
            <img
              className="codeimage"
              src="https://cdn.discordapp.com/attachments/919772630255534083/921018331471945778/unknown.png"
              alt=""
            />
          </div>
          <div className="zh80">
            <form
              className="loginform"
              action=""
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="email"
                onChange={handleInputValue('email')}
              ></input>
              <input
                type="password"
                placeholder="password"
                onChange={handleInputValue('password')}
              ></input>
              <input type="submit" value="login" onClick={handleLogin}></input>
              <div className="alert-box">{errorMessage}</div>
            </form>
          </div>
        </div>
        <div className="lo02 th50 login02">
          <div className="zh40 snslogolist">
            <a href="https://www.google.com">
              <img
                className="snslogo zw10"
                src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png"
                alt="googlelogo"
              />
            </a>
            <a href="https://www.naver.com/">
              <img
                className="snslogo zw10"
                src="https://i2.wp.com/bwithmag.com/wp-content/uploads/2018/06/2%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5-N-%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.jpg?fit=526%2C527"
                alt="naverlogo"
              />
            </a>
          </div>
          <div className="zh40">소셜로그인</div>

          <input className="zh20 signup " type="button" value="signup"></input>
        </div>
      </div>
    </div>
  )
}

export default BeforeLogin
