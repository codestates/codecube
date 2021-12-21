import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

const Mypage = (props) => {
  const {
    username = 'null',
    stacks = '',
    description = '',
    image = '',
    email = '',
  } = props.userinfo

  const navigate = useNavigate()
  const [editProfileBtn, setEditProfileBtn] = useState(false)
  const [userInfoEdited, setUserInfoEdited] = useState({
    image: image,
    // password: '',
    email: email,
    username: username,
    stacks: stacks,
    description: description,
  })

  const [errorMessage, setErrorMessage] = useState('')
  const handleInputValue = (key) => (e) => {
    setUserInfoEdited({ ...userInfoEdited, [key]: e.target.value })
  }

  const handleEdit = () => {
    setEditProfileBtn(true)
    navigate('/')
  }

  const handleSave = () => {
    console.log('ssssssss', userInfoEdited)
    props.setUserinfo([userInfoEdited])
    setEditProfileBtn(false)
    navigate('/')
  }

  const handleWithdraw = () => {
    axios.delete('http://localhost:4000/users').then((res) => {
      confirm('정말로 탈퇴하시겠습니까?')
      alert('회원가입이 탈퇴되었습니다')
      props.setisLoggedIn(false)
      navigate('/')
    })
  }

  const 마이페이지 = () => {
    setEditProfileBtn(false)
    navigate('/')
  }

  return (
    <div>
      {editProfileBtn ? (
        <center>
          <h1>프로필수정</h1>
          <div>{email}</div>
          <form className="loginformA" action="" onSubmit={(e) => e.preventDefault()}>
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
