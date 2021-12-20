// import React from 'react'
// import styled from 'styled-components'
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// import ProfileImage from '../../components/profileImage'
// import UserInfo from '../../components/userInfo'

// import profileDummy from '../../dummy/userinfo/profileDummy'
// import './beforeLogin.css'

// const Mypage = () => {
//   const [userInfo, setUserInfo] = useState({
//     image: '',
//     email: '',
//     password: '',
//     username: '',
//     stacks: '',
//     description: '',
//   })
//   const [errorMessage, setErrorMessage] = useState('')
//   const handleInputValue = (key) => (e) => {
//     setUserInfo({ ...signupInfo, [key]: e.target.value })
//   }
//   const handleUserInfo = () => {
//     // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출합니다.
//     // TODO : 이메일 및 비밀번호를 입력하지 않았을 경우 에러를 표시해야 합니다.
//     const { image, email, password, stacks, description, username } = userInfo
//     // const result = profileDummy.filter((ele) => {
//     //   ele.email === email && ele.password === password
//     // })
//     // console.log(profileDummy)
//     // console.log(result)
//     // console.log(loginInfo)

//     if (!email || !password) {
//       setErrorMessage('사용하실 이메일과 비밀번호를 입력하세요')
//     } else {
//       //   const result = profileDummy.map((ele)=>{
//       //     if(ele.email === email && ele.password===password){
//       //         return ele
//       //     }

//       // })

//       if (result) {
//         //   axios.post('https://localhost:4000/signin',loginInfo)
//         //   .then(res=>{
//         //     // console.log("로그인후받아온쿠키???", res);
//         //     handleResponseSuccess()
//         //   })
//         //   .catch(err=>{
//         //     console.log(err)
//         //     alert('사용자정보가 없습니다.')
//         //   })

//         alert('회원가입성공')
//       } else {
//         alert('사용자정보가 없습니다.')
//       }
//     }
//   }

//   // const handleSignup = async () => {
//   //   // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동하세요.
//   //   //        회원가입 성공 후 로그인 페이지 이동은 다음 코드를 이용하세요.
//   //   //
//   //   //        history.push("/");
//   //   //
//   //   // TODO : 모든 항목을 입력하지 않았을 경우 에러를 표시해야 합니다.
//   //   const {email, password, username, mobile} = userinfo;
//   //   console.log("창에 입력한 이메일이다", email)
//   //   if(!email || !password|| !username||!mobile){
//   //     setErrorMessage('모든 항목은 필수입니다');
//   //     alert(`${errorMessage}`)
//   //   }
//   //   else{
//   //     await axios.post('https://localhost:4000/signup', userinfo)
//   //     .then(res=>{
//   //       console.log("사인업후 받아온데이터 ",res.data); //사인업후 받아온데이터  { message: 'ok' }
//   //       if(res.data.message === "ok"){
//   //         history.push("/")
//   //       }
//   //     })
//   //     .catch(err =>{
//   //       console.log(err);
//   //       alert(err);
//   //     })
//   //   }
//   // };

//   return (
//     <div className="Signup1">
//       <div className="lo01A th50A login01A">
//         <div className="zh20A codecubelogoA">
//           <img
//             className="codeimageA"
//             src="./dummy/codecubelogo.png"
//             alt="codecubelog"
//           />
//         </div>
//         <div className="zh80A">
//           <form
//             className="loginformA"
//             action=""
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <input
//               type="file"
//               id="chooseFile"
//               name="chooseFile"
//               accept="image/*"
//               onChange={loadFile}
//             />
//             <input
//               className="inputA"
//               type="email"
//               placeholder="email"
//               onChange={handleInputValue('email')}
//             ></input>
//             <input
//               className="inputA"
//               type="password"
//               placeholder="password"
//               onChange={handleInputValue('password')}
//             ></input>
//             <input
//               className="inputA"
//               type="username"
//               placeholder="username"
//               onChange={handleInputValue('username')}
//             ></input>
//             <input
//               className="inputA"
//               type="button"
//               value="수정"
//               onClick={handleSignup}
//             ></input>
//             <div className="alert-boxA">{errorMessage}</div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Mypage
// import React from 'react'
// import axios from 'axios'

// axios.defaults.withCredentials = true

// function Mypage(props) {
//   /* TODO : props로 받은 유저정보를 화면에 표시하세요. */
//   // if (!props.userinfo) {
//   //   return null
//   //   // 리턴에 null 넣으면 랜더링 안됨
//   // } else {
//   //   console.log('인증후받아온정보', props.userinfo)
//   // const { email, username, stacks, description } = props.userinfo
//   const { email, username, stacks, description } = props.userinfo[0]
//   // }
//   return (
//     <div>
//       <center>
//         <h1>Mypage</h1>
//         <div className="username">{username}</div>
//         <div className="email">{email}</div>
//         <div className="stacks">{stacks}</div>
//         <div className="description">{description}</div>
//         <button className="btn btn-logout" onClick={props.handleLogout}>
//           logout
//         </button>
//         <button className="btn btn-edit" onClick={props.handleEdit}>
//           edit profile
//         </button>
//       </center>
//     </div>
//   )
// }

// export default Mypage

import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

const Mypage = (props) => {
  /* TODO : props로 받은 유저정보를 화면에 표시하세요. */
  // if (!props.userinfo) {
  //   return null
  //   // 리턴에 null 넣으면 랜더링 안됨
  // } else {
  //   console.log('인증후받아온정보', props.userinfo)
  // const { email, username, stacks, description } = props.userinfo
  //https://jess2.xyz/vue/data-undefined-error/
  // TypeError: Cannot read property of undefined
  const { username, stacks, description, image, email } = props.userinfo[0]
  const navigate = useNavigate()

  const [editProfileBtn, setEditProfileBtn] = useState(false)
  // const [saveProfileBtn, setSaveProfileBtn] = useState(false)
  const [userInfoEdited, setUserInfoEdited] = useState({
    image: image,
    password: '',
    email: email,
    username: username,
    stacks: stacks,
    description: description,
  })
  // 패스워드는 어떻게 수정해야할까?? 다시 엑시오스 요청보내서 받아와아함까?
  // 기존 비밀번호? 요청보내서 확인하고 확인됐으면 비번 바꿀수있게???
  // 현재 패스워드 바꿀패스 한버더 확인패스워드 ~~~~~~일단은
  // 회원탈퇴~~모달창으로 컴펌 띠우기
  //https://velog.io/@edie_ko/React-%EC%84%B8%EC%83%81-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EB%AA%A8%EB%8B%AC%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-X

  //https://getbootstrap.com/docs/4.0/components/modal/

  const [errorMessage, setErrorMessage] = useState('')
  const handleInputValue = (key) => (e) => {
    setUserInfoEdited({ ...userInfoEdited, [key]: e.target.value })
  }

  const handleEdit = () => {
    // axios.put('https://localhost:4000/').then((res) => {
    //   setUserinfo(null)
    //   setisLoggedIn(true)
    //   navigate('/')
    // })
    setEditProfileBtn(true)
    // props.setisLoggedIn(true)
    navigate('/')
  }
  console.log('프롭스로받아온유져인포', props.userinfo[0])
  console.log('수정전', userInfoEdited)

  const handleSave = () => {
    console.log('ssssssss', userInfoEdited)
    props.setUserinfo([userInfoEdited])
    setEditProfileBtn(false)
    navigate('/')
  }
  console.log()

  console.log('수정후', props.userinfo[0])

  const handleWithdraw = () => {
    confirm('정말로 탈퇴하시겠습니까?')
    alert('회원가입이 탈퇴되었습니다')
    props.setisLoggedIn(false)
    navigate('/')
  }
  // }
  //비밀번호 매치 함수
  const 마이페이지 = () => {
    setEditProfileBtn(false)
    navigate('/')
  }

  return (
    <div>
      {/* <button onClick={() => navigate(-2)}>Go 2 pages back</button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>Go forward</button>
      <button onClick={() => navigate(2)}>Go 2 pages forward</button> */}
      {editProfileBtn ? (
        <center>
          <h1>프로필수정</h1>
          <div>{email}</div>
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
              value={userInfoEdited.image}
              onChange={handleInputValue('image')}
            />
            <input
              className="inputA"
              type="password"
              placeholder="password"
              value={userInfoEdited.password}
              onChange={handleInputValue('password')}
            ></input>
            <input
              className="inputA"
              type="text"
              placeholder="username"
              value={userInfoEdited.username}
              onChange={handleInputValue('username')}
            ></input>
            <textarea
              className="inputA"
              type="text"
              placeholder="stacks"
              value={userInfoEdited.stacks}
              onChange={handleInputValue('stacks')}
            ></textarea>
            <textarea
              className="inputA"
              type="text"
              placeholder="description"
              value={userInfoEdited.description}
              onChange={handleInputValue('description')}
            ></textarea>
            <input
              className="inputA"
              type="submit"
              value="저장버튼"
              onClick={handleSave}
            ></input>
          </form>
          <button onClick={마이페이지}>내페이지</button>
        </center>
      ) : (
        <center>
          <h1>Mypage</h1>
          <div className="username">{username}</div>
          <div className="email">{email}</div>
          <div className="stacks">{stacks}</div>
          <div className="description">{description}</div>
          <button className="btn btn-logout" onClick={props.handleLogout}>
            logout
          </button>
          <button className="btn btn-edit" onClick={handleEdit}>
            edit profile
          </button>
          <button className="btn btn-withdrawal" onClick={handleWithdraw}>
            Account Withdraw(회원탈퇴)
          </button>
        </center>
      )}
    </div>
  )
}

export default Mypage
