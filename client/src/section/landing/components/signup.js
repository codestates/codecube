import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { IconContext } from 'react-icons/lib'
import { AiOutlineLogin } from 'react-icons/ai'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io'

// meta
const NONE = 'NONE'
const VISIBLE = 'VISIBLE'
const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'
const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

// styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;

  flex: 1 0 0%;
`

const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 20%;

  @keyframes appear-title {
    from {
      opacity: 0;
      transform: translateX(-10%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  animation: appear-title 3s;
`

const Form = styled.form`
  /* test */
  /* background-color: gray; */
  margin-bottom: 5%;

  & input {
    /* position: relative; */
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  text-align: end;
  /* test */

  position: relative;
  width: 50%;
`

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const DownArrow = styled(IoMdArrowDropdownCircle)``
const UpArrow = styled(IoMdArrowDropupCircle)``

const Email = styled.input.attrs({ type: 'text', placeholder: '이메일', id: 'email' })`
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

const PassWord = styled(Email).attrs({
  type: 'password',
  placeholder: '비밀번호',
  id: 'password',
})`
  /* test */
  /* position: absolute;
  top: 150%;
  left: 0; */
  /* test */

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

const PWConfirm = styled(Email).attrs({
  type: 'password',
  placeholder: '비밀번호확인',
  id: 'pwConfirm',
})`
  /* test */
  /* position: absolute;
  top: 300%;
  left: 0; */
  /* test */

  visibility: ${(props) => (props.iscorrect === NONE ? 'hidden' : 'visible')};
  opacity: ${(props) => (props.iscorrect === NONE ? '0' : '1')};
  transform: ${(props) =>
    props.iscorrect === NONE ? 'translateY(-40%)' : 'translateY(0%)'};
  pointer-events: ${(props) => (props.iscorrect === NONE ? 'none' : 'auto')};

  transition: 1s;
  &:focus {
    & + .enter3 {
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

const ICON_enter3 = styled(ICON_enter)`
  top: 350%;

  transform: ${(props) =>
    props.iscorrect === NONE ? 'translateY(-90%)' : 'translateY(-50%)'};
`

const Indicator = styled.div`
  /* position: absolute;
  bottom: 5%;
  right: 2%; */

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

const Indicator3 = styled(Indicator)`
  top: 415%;
`

//React
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [isCorrectE, setIsCorrectE] = useState(NONE)
  const [isCorrectP, setIsCorrectP] = useState(NONE)
  const [isCorrectPwc, setIsCorrectPwc] = useState(NONE)
  const [indiAlarm, setIndiAlarm] = useState('')
  const [indiPwcAlarm, setIndiPwcAlarm] = useState('')
  const passwordRef = useRef(null)
  const pwcRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validator = async (type) => {
    if (type === 'email') {
      let regEmail =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

      if (!regEmail.test(email)) {
        setIndiAlarm('이메일 형식으로 작성해주세요')
        setIsCorrectE(INCORRECT)
      } else if (email.length > 30) {
        setIndiAlarm('아이디는 30자 이내의 이메일입니다')
        setIsCorrectE(INCORRECT)
      } else {
        setIndiAlarm('')
        setIsCorrectE(CORRECT)
        if (isCorrectP === NONE) setIsCorrectP(VISIBLE)
        passwordRef.current.focus()
      }
    }
    if (type === 'password') {
      let regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Z|a-z|\d|@$!%*#?&|]{6,40}$/
      if (!regPw.test(password)) {
        setIndiAlarm('6-40글자의 영문/숫자 조합으로 구성해주세요')
        setIsCorrectP(INCORRECT)
      } else {
        setIndiAlarm('')
        setIsCorrectP(CORRECT)
        pwcRef.current.focus()
      }
    }
    if (type === 'pwConfirm') {
      if (password !== pwConfirm) {
        setIndiPwcAlarm('비밀번호가 일치하지 않습니다')
        setIsCorrectPwc(INCORRECT)
      } else {
        setIsCorrectPwc(CORRECT)
      }
    }
  }

  useEffect(() => {
    if (isCorrectE === CORRECT && isCorrectP === CORRECT && isCorrectPwc === CORRECT) {
      console.log('이제야 다맞췃네 하.')
    } else {
      console.log('엔터인식?')
      console.log('E', isCorrectE)
      console.log('P', isCorrectP)
      console.log('Pwc', isCorrectPwc)
    }
  }, [isCorrectPwc])

  const onEmail = (e) => setEmail(e.target.value)
  const onPassword = (e) => setPassword(e.target.value)
  const onPwConfirm = (e) => setPwConfirm(e.target.value)

  const onNext = (e) => {
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'click') {
      validator(e.target.id)
    } else return
  }

  const tabEvent = (e) => {
    if (e.code === 'Tab' || e.keyCode === 9) {
      e.preventDefault()
      validator(e.target.id)
    } else return
  }

  return (
    <Wrapper>
      <Title>아이디와 비밀번호를 입력해 주세요</Title>
      <IconContext.Provider value={{ size: '1.4rem' }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Email
            value={email}
            onChange={onEmail}
            onKeyUp={onNext}
            onKeyDown={tabEvent}
            onError={(e) => console.log(e)}
          />
          <ICON_enter str={email} className="enter1" id="email" onClick={onNext} />
          <Indicator iscorrect={isCorrectE}>{indiAlarm}</Indicator>
          <PassWord
            ref={passwordRef}
            iscorrect={isCorrectP}
            onChange={onPassword}
            onKeyUp={onNext}
            value={password}
          />
          <ICON_enter2
            str={password}
            className="enter2"
            onClick={onNext}
            iscorrect={isCorrectP}
          />
          <Indicator2 iscorrect={isCorrectP}>{indiAlarm}</Indicator2>
          <PWConfirm
            ref={pwcRef}
            iscorrect={isCorrectP}
            onChange={onPwConfirm}
            onKeyUp={onNext}
            value={pwConfirm}
          />
          <ICON_enter3
            str={pwConfirm}
            className="enter3"
            onClick={onNext}
            iscorrect={isCorrectPwc}
          />
          <Indicator3 iscorrect={isCorrectPwc}>{indiPwcAlarm}</Indicator3>
        </Form>
        <ArrowWrapper>
          <UpArrow />
          <DownArrow />
        </ArrowWrapper>
      </IconContext.Provider>
    </Wrapper>
  )
}
export default Signup
