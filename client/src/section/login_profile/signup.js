import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

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
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
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
    const { email, password, username, stacks, description, image } = signupInfo
    signupInfo['stacks'] = checkedStacks
    console.log('창에 입력한 이메일이다', signupInfo)
    if (!email || !password || !username) {
      setErrorMessage('모든 항목은 필수입니다')
      alert(`${errorMessage}`)
    } else {
      await axios
        .post('http://localhost:4000/signup', signupInfo)
        .then((res) => {
          props.isAuthenticated()
          console.log('사인업후 받아온데이터 ', res) //사인업후 받아온데이터  { message: 'ok' }
          if (res.data.message === 'signup successed') {
            props.setIsSignup(false)
            // navigate('/')
          }
        })
        .catch((err) => {
          console.log(err)
          alert(err)
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
      // setUserInfoEdited[stacks] = checkedStacks
      // console.log('스택추가되는거', userInfoEdited)
    } else {
      setCheckedStacks(checkedStacks.filter((el) => el !== id))
      // setUserInfoEdited[stacks] = checkedStacks
      // console.log('스택제거되는거', userInfoEdited)
    }
  }

  return (
    <div className="Signup1">
      <h1>회원가입</h1>
      <button value="로그인 화면으로" onClick={backtoLogin}>
        로그인화면으로
      </button>
      <div className="lo01A th50A login01A">
        <div className="zh20A codecubelogoA">
          <img className="codeimageA" src="./dummy/codecubelogo.png" alt="codecubelog" />
        </div>
        <div className="zh80A">
          <form className="loginformA" action="" onSubmit={(e) => e.preventDefault()}>
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
            <h3>Stacks</h3>
            {stacklist.map((el) => {
              return (
                <div key={el.id}>
                  <input
                    type="checkbox"
                    value={el.name}
                    key={el.id}
                    className={checkboxstyle}
                    // checked={isChecked}
                    onChange={(e) => {
                      checkboxhandler(e.currentTarget.checked, el.id)
                    }}
                    checked={checkedStacks.includes(el.id) ? true : false}
                  ></input>
                  <label style={checkboxstyle}>{el.name}</label>
                </div>
              )
            })}
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
