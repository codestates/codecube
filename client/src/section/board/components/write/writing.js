import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Wrapper } from '../../../projectDetail/components/modal.js'
import { handleAutoSaving, handlePosting } from '../../../../actions/writing'
import Posting from './posting'
import BlockingBox from './blockingBox.js'

const Title = styled.input.attrs({
  type: 'text',
  placeholder: '제목을 입력하세요',
  autoFocus: 'autoFocus',
})`
  font-size: 3rem;
  margin: 2rem;
  margin-bottom: 1rem;
  border: none;
  outline: none;
`

const Floor = styled.div`
  background-color: #202020;
  width: 20%;
  height: 0.5rem;
  margin: 0 2rem 2rem 2rem;
`

const Floor2 = styled.div`
  background-color: lightgray;
  width: 80%;
  height: 0.4rem;
  margin-bottom: 1rem;
  margin-left: 10%;
  border-radius: 10px;
`

const Content = styled.textarea.attrs({
  placeholder: '프로젝트를 소개해주세요',
  cols: 200,
})`
  flex: 1 0 0%;
  resize: none;
  margin: 0 2rem 2rem 2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  line-height: 1.5rem;
`

const Footer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 2rem;
  background-color: #f8fbff;

  & > .next {
    position: absolute;
    right: 2rem;
  }
`

export const Button = styled.input.attrs({
  type: 'button',
})`
  width: 6.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;

  cursor: pointer;
  transition: 0.4s;
  &.exit {
    background-color: #f4f4f4;
  }
  &.exit:hover {
    background-color: #f1f1f1;
  }
  &.next {
    background-color: #00b0ff;
    color: white;
  }
  &.next:hover {
    transform: scale(103%);
  }
`

const TITLE = 'TITLE'
const CONTENT = 'CONTENT'

const Writing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [titleState, setTitleState] = useState('')
  const [contentState, setContentState] = useState('')
  const autoSaver = useRef(null)

  // 아래는 로그인 하지않고 글쓰기를 시도했을 때 보여줄 경고메세지를 위한 상태 처리
  // writing과 posting 두 단계에서만 사용될 상태이기때문에 리덕스 스토어에 포함시키지않고 props로 처리했습니다.
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    // 새로고침 시 isLoggedIn이 반드시 한번 변화하고 변화 후 상태가 진짜 상태이기때문에 최종적으론 alert가 useEffect로 설정됩니다.
    setAlert(!isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    // 리덕스 자동저장
    clearTimeout(autoSaver.current)
    autoSaver.current = null
    autoSaver.current = setTimeout(() => {
      dispatch(handleAutoSaving(titleState, contentState, '', ''))
    }, 1000)

    return () => {
      clearTimeout(autoSaver.current)
    }
  }, [titleState, contentState])

  const onTyping = (e, type) => {
    if (type === TITLE) setTitleState(e.target.value)
    else if (type === CONTENT) setContentState(e.target.value)
  }

  const onExit = () => {
    navigate('/')
  }

  const onNext = () => {
    dispatch(handlePosting())
  }

  return (
    <Wrapper className="write">
      <Title onChange={(e) => onTyping(e, TITLE)} value={titleState} />
      <Floor />
      <Content onChange={(e) => onTyping(e, CONTENT)} value={contentState} />
      <Floor2 />
      <Footer>
        <Button className="exit" value="나가기" onClick={onExit} />
        <Button className="next" value="작성하기" onClick={onNext} />
      </Footer>
      <Posting setAlert={setAlert} />
      <BlockingBox alert={alert} setAlert={setAlert} />
    </Wrapper>
  )
}

export default Writing
