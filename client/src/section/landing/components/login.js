import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { IconContext } from 'react-icons/lib'
import { AiOutlineLogin } from 'react-icons/ai'
import { handleMainPage } from '../../../actions/start'

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
`

const ICON_enter = styled(AiOutlineLogin)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  opacity: 0;
  color: ${(props) => (props.str.length ? '#00B0FF' : 'lightgray')};

  transition: 0.4s;
  cursor: pointer;
`

const PassWord = styled(Email).attrs({ type: 'password', placeholder: '비밀번호' })`
  position: absolute;
  top: 110%;
  left: 0;

  /* display: ${(props) => (props.isCorrect ? 'block' : 'none')}; */
  visibility: ${(props) => (props.isCorrect ? 'visible' : 'hidden')};

  opacity: ${(props) => (props.isCorrect ? '1' : '0')};
  pointer-events: ${(props) => (props.isCorrect ? 'auto' : 'none')};

  transition: opacity 0.4s;

  &:focus {
    & + .enter2 {
      opacity: 1;
    }
  }
`

const ICON_enter2 = styled(ICON_enter)`
  top: 160%;
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()

  const onEmail = (e) => {
    setEmail(e.target.value)
  }

  const onPassword = (e) => {
    setPassword(e.target.value)
  }

  const onNext = (e) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
      setIsCorrect(true)
      if (isCorrect) {
        passwordRef.current.focus()
      }
    } else {
      return
    }
  }

  const onLogin = (e) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
      dispatch(handleMainPage())
    } else {
      return
    }
  }

  useEffect(() => {
    if (isCorrect) {
      passwordRef.current.focus()
    }
  }, [isCorrect])

  return (
    <Wrapper>
      <Greeter>CODE CUBE 로그인 페이지입니다.</Greeter>
      <IconContext.Provider value={{ size: '1.4rem' }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Email
            value={email}
            onChange={onEmail}
            onKeyUp={onNext}
            onError={(e) => console.log(e)}
          />
          <ICON_enter str={email} className="enter1" />
          <PassWord
            ref={passwordRef}
            isCorrect={isCorrect}
            onChange={onPassword}
            onKeyUp={onLogin}
            value={password}
          />
          <ICON_enter2 str={password} className="enter2" />
        </Form>
      </IconContext.Provider>
    </Wrapper>
  )
}
export default Login
