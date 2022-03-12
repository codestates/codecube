import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { IconContext } from 'react-icons/lib'
import { AiOutlineLogin } from 'react-icons/ai'
import { handleLoggedIn } from '../../../actions/login'
import axios from 'axios'

// meta
const NONE = 'NONE'
const VISIBLE = 'VISIBLE'
const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'

// styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;

  flex: 1 0 0%;
`
const Greeter = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 20%;

  @keyframes appear-greeter {
    from {
      opacity: 0;
      transform: translateX(-10%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  animation: appear-greeter 3s;
`
const Form = styled.form`
  position: relative;
  width: 50%;
  margin-bottom: 20%;
`

const Email = styled.input.attrs({ type: 'text', placeholder: '이메일' })`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  color: gray;

  padding: 0 1rem;
  outline: none;

  &:focus {
    & + .enter1 {
      opacity: 1;
    }
  }
  @keyframes appear-input {
    from {
      opacity: 0;
      transform: translateY(-40%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  animation: appear-input 1s;
`

const PassWord = styled(Email).attrs({ type: 'password', placeholder: '비밀번호' })`
  position: absolute;
  top: 150%;
  left: 0;

  visibility: ${(props) => (props.iscorrect === NONE ? 'hidden' : 'visible')};
  opacity: ${(props) => (props.iscorrect === NONE ? '0' : '1')};
  transform: ${(props) =>
    props.iscorrect === NONE ? 'translateY(-40%)' : 'translateY(0%)'};
  pointer-events: ${(props) => (props.iscorrect === NONE ? 'none' : 'auto')};

  transition: 1s;
  &:focus {
    & + .enter2 {
      opacity: 1;
    }
  }
`

const ICON_enter = styled(AiOutlineLogin)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  opacity: 0;
  color: ${(props) => (props.str.length ? '#00B0FF' : 'lightgray')};

  transition: 1s;
  cursor: pointer;
`

const ICON_enter2 = styled(ICON_enter)`
  top: 200%;

  transform: ${(props) =>
    props.iscorrect === NONE ? 'translateY(-90%)' : 'translateY(-50%)'};
`

const Indicator = styled.div`
  position: absolute;
  top: 115%;
  right: 2%;

  display: ${(props) => (props.iscorrect === INCORRECT ? 'block' : 'none')};
  opacity: ${(props) => (props.iscorrect === INCORRECT ? '1' : '0')};
  font-size: 0.5rem;
  color: tomato;

  pointer-events: 'none';
  cursor: default;
  transition: opacity 0.4s;
`

const Indicator2 = styled(Indicator)`
  top: 265%;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;
`

const Menu = styled.p`
  font-size: 0.7rem;
  padding-bottom: 5%;
`

const MenuLink = styled(Menu)`
  color: #439dff;
  cursor: pointer;
`

const GithubLogo = styled.img.attrs({
  src: `${'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'}`,
})`
  width: 10%;
  cursor: pointer;
`

//React
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCorrectE, setIsCorrectE] = useState(NONE)
  const [isCorrectP, setIsCorrectP] = useState(NONE)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const emailValidator = () => {
    let regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if (!regEmail.test(email)) {
      setIsCorrectE(INCORRECT)
    }
    if (regEmail.test(email)) {
      setIsCorrectE(CORRECT)
      if (isCorrectP === NONE) setIsCorrectP(VISIBLE)
      passwordRef.current.focus()
    }
  }

  const onEmail = (e) => setEmail(e.target.value)
  const onPassword = (e) => setPassword(e.target.value)

  const onNext = (e) => {
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'click') {
      emailValidator()
    } else return
  }

  const tabEvent = (e) => {
    if (e.code === 'Tab' || e.keyCode === 9) {
      e.preventDefault()
      emailValidator()
    } else return
  }

  const onLogin = (e) => {
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'click') {
      dispatch(handleLoggedIn(email, password, navigate, setIsCorrectP))
    } else return
  }

  const socialClick = () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    )
  }

  useEffect(() => {
    if (isCorrectP !== NONE && email !== '') {
      setTimeout(() => {
        passwordRef.current.focus()
      }, 100)
    }
  }, [isCorrectE, isCorrectP])

  return (
    <Wrapper>
      <Greeter>함께 성장할 동료를 찾으세요!</Greeter>
      <IconContext.Provider value={{ size: '1.4rem' }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Email
            value={email}
            onChange={onEmail}
            onKeyUp={onNext}
            onKeyDown={tabEvent}
            onError={(e) => console.log(e)}
          />
          <ICON_enter str={email} className="enter1" onClick={onNext} />
          <Indicator iscorrect={isCorrectE}>이메일 형식으로 작성해주세요</Indicator>
          <PassWord
            ref={passwordRef}
            iscorrect={isCorrectP}
            onChange={onPassword}
            onKeyUp={onLogin}
            value={password}
          />
          <ICON_enter2
            str={password}
            className="enter2"
            onClick={onLogin}
            iscorrect={isCorrectP}
          />
          <Indicator2 iscorrect={isCorrectP}>
            이메일 또는 비밀번호를 확인해주세요
          </Indicator2>
        </Form>
      </IconContext.Provider>
      <MenuWrapper>
        <Menu>계정이 없으신가요? </Menu>
        <MenuLink
          onClick={() => {
            navigate('/signup')
          }}
        >
          지금 시작하세요!
        </MenuLink>
        <Menu>간편 소셜로그인</Menu>
        <GithubLogo onClick={socialClick} />
      </MenuWrapper>
    </Wrapper>
  )
}
export default Login
