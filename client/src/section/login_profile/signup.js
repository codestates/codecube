//모달창으로 사인업
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

// import ProfileImage from '../../components/profileImage'
// import UserInfo from '../../components/userInfo'

import profileDummy from '../../dummy/userinfo/profileDummy'
// import './beforeLogin.css'

const Signup = (props) => {
  const [signupInfo, setSignupInfo] = useState({
    image: '',
    email: '',
    password: '',
    username: '',
    stacks: '',
    description: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value })
  }
  const handleSignup = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
    // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
    const { image, email, password, stacks, description, username } = signupInfo
    // const result = profileDummy.filter((ele) => {
    //   ele.email === email && ele.password === password
    // })
    // console.log(profileDummy)
    // console.log(result)
    // console.log(loginInfo)

    if (!email || !password || !username) {
      setErrorMessage('사용하실 이메일과 비밀번호, 유저이름을 입력하세요')
    } else {
      //   const result = profileDummy.map((ele)=>{
      //     if(ele.email === email && ele.password===password){
      //         return ele
      //     }

      // })

      // if (result) {
      //   //   axios.post('https://localhost:4000/signin',loginInfo)
      //   //   .then(res=>{
      //   //     // console.log("로그인후받아온쿠키???", res);
      //   //     handleResponseSuccess()
      //   //   })
      //   //   .catch(err=>{
      //   //     console.log(err)
      //   //     alert('사용자정보가 없습니다.')
      //   //   })

      //   alert('회원가입성공')
      // } else {
      //   alert('사용자정보가 없습니다.')
      // }
      const result = profileDummy.push(signupInfo)
      console.log(profileDummy)
      props.setIsSignup(false)
      navigate('/')
    }
  }

  // const handleSignup = async () => {
  //   // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
  //   //        회원가입 성공 후 로그인 페이지 이동은 다음 코드를 이용하세요.
  //   //
  //   //        history.push("/");
  //   //
  //   // TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.
  //   const {email, password, username, mobile} = userinfo;
  //   console.log("창에 입력한 이메일이다", email)
  //   if(!email || !password|| !username||!mobile){
  //     setErrorMessage('모든 항목은 필수입니다');
  //     alert(`${errorMessage}`)
  //   }
  //   else{
  //     await axios.post('https://localhost:4000/signup', userinfo)
  //     .then(res=>{
  //       console.log("사인업후 받아온데이터 ",res.data); //사인업후 받아온데이터  { message: 'ok' }
  //       if(res.data.message === "ok"){
  //         history.push("/")
  //       }
  //     })
  //     .catch(err =>{
  //       console.log(err);
  //       alert(err);
  //     })
  //   }
  // };
  const backtoLogin = () => {
    props.setIsSignup(false)
    navigate('/')
  }

  return (
    <div className="Signup1">
      <h1>회원가입</h1>
      <button value="로그인 화면으로" onClick={backtoLogin}>
        로그인화면으로
      </button>
      <div className="lo01A th50A login01A">
        <div className="zh20A codecubelogoA">
          <img
            className="codeimageA"
            src="./dummy/codecubelogo.png"
            alt="codecubelog"
          />
        </div>
        <div className="zh80A">
          <form
            className="loginformA"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="file"
              id="chooseFile"
              name="chooseFile"
              accept="image/*"
              onChange={handleInputValue('image')}
            />
            <input
              className="inputA"
              type="email"
              placeholder="email"
              onChange={handleInputValue('email')}
            ></input>
            <input
              className="inputA"
              type="password"
              placeholder="password"
              onChange={handleInputValue('password')}
            ></input>
            <input
              className="inputA"
              type="username"
              placeholder="username"
              onChange={handleInputValue('username')}
            ></input>
            <textarea
              className="inputA"
              type="stacks"
              placeholder="stacks"
              onChange={handleInputValue('stack')}
            ></textarea>
            <textarea
              className="inputA"
              type="description"
              placeholder="description"
              onChange={handleInputValue('description')}
            ></textarea>
            <input
              className="inputA"
              type="submit"
              value="singup"
              onClick={handleSignup}
            ></input>
            <div className="alert-boxA">{errorMessage}</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
