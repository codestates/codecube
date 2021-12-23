import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
require('dotenv').config()
import './signup.css'

const Signup = (props) => {
  const [signupInfo, setSignupInfo] = useState({
    image: '',
    email: '',
    password: '',
    username: '',
    stacks: '',
    description: '',
  })

  const [checkedStacks, setCheckedStacks] = useState([])
  const [signupText, setSignupText] = useState('signup')
  const navigate = useNavigate()
  const alertBox = useRef()

  useEffect(() => {
    setSignupText('signup')
    alertBox.current.classList.remove('alert')
  }, [signupInfo])

  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value })
  }

  const stacklist = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Node.js' },
    { id: 4, name: 'express' },
    { id: 5, name: 'Docker' },
    { id: 6, name: 'css_styled' },
    { id: 7, name: 'Mysql' },
    { id: 8, name: 'MongoDB' },
    { id: 9, name: 'redis' },
    { id: 10, name: 'Python' },
    { id: 11, name: 'C#' },
  ]

  const checkboxstyle = {
    justifycontent: 'center',
    alignitems: 'center',
  }

  const handleSignup = async () => {
    const { email, password, username, description, image } = signupInfo
    signupInfo['stacks'] = checkedStacks
    if (!email || !password || !username) {
      alertBox.current.classList.add('alert')
      setSignupText('모든 항목은 필수입니다')
    } else {
      await axios
        .post(REACT_APP_API__URL + '/signup', signupInfo)
        .then((res) => {
          props.isAuthenticated()
          console.log('사인업후 받아온데이터 ', res) //사인업후 받아온데이터  { message: 'ok' }
          if (res.data.message === 'signup successed') {
            props.setIsSignup(false)
          }
        })
        .catch((err) => {
          setSignupText('잠시후 다시 시도해 주세요')
        })
    }
  }

  const backtoLogin = () => {
    props.setIsSignup(false)
    navigate('/')
  }

  const checkboxhandler = (checked, id) => {
    if (checked) {
      setCheckedStacks([...checkedStacks, id])
    } else {
      setCheckedStacks(checkedStacks.filter((el) => el !== id))
    }
  }

  //사진 삭제 전송 함수
  function changeMyprofile(event) {
    props.changePhoto(event)
  }
  function clearMyProfile(event) {
    props.clearPhoto(event)
  }
  return (
    <div className="left-box main-box">
      <h1>회원가입</h1>
      <button className="mypage-btn" value="로그인 화면으로" onClick={backtoLogin}>
        로그인화면으로
      </button>
      <div id="left-image-wrapper">
        {props.File ? (
          <div id="left-pi-wrapper">
            <img id="left-pi" src={props.File} />
            <button onClick={clearMyProfile}> Clear IMG</button>
          </div>
        ) : (
          <div id="left-pi-wrapper">기본 이미지</div>
        )}
        <input
          id="left-profile-button"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={changeMyprofile}
        />
        <label id="left-fake-btn" htmlFor="left-profile-button">
          프로필
        </label>
        <input id="left-delete-button" className="hidden" />
        <label id="left-fake-delete" htmlFor="left-delete-button">
          삭제
        </label>
      </div>
      <div id="left-input-wrapper">
        <form className="form-wrapper" action="" onSubmit={(e) => e.preventDefault()}>
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
          <h3>Stacks</h3>
          <div id="stack-wrapper">
            {stacklist.map((el) => {
              return (
                <div key={el.id}>
                  <input
                    type="checkbox"
                    value={el.name}
                    key={el.id}
                    className={checkboxstyle}
                    onChange={(e) => {
                      checkboxhandler(e.currentTarget.checked, el.id)
                    }}
                    checked={checkedStacks.includes(el.id) ? true : false}
                  ></input>
                  <label style={checkboxstyle}>{el.name}</label>
                </div>
              )
            })}
          </div>
          <textarea
            className="left-textarea"
            type="description"
            placeholder="description"
            onChange={handleInputValue('description')}
          ></textarea>
          <input
            ref={alertBox}
            className="mypage-btn"
            type="submit"
            value={signupText}
            onClick={handleSignup}
          ></input>
        </form>
      </div>
    </div>
  )
}

export default Signup
