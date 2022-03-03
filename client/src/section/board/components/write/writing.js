import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Wrapper } from '../projects/projectDetail'
import { handlePosting } from '../../../../actions/writing'
import Posting from './posting'

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

  // useEffect(() => {
  //   if (autoSaver.current !== null) {
  //     clearTimeout(autoSaver.current)
  //     autoSaver.current = setTimeout(() => console.log('hello'), 2000)
  //   }
  //   return () => {
  //     clearTimeout(autoSaver.current)
  //     // autoSaver.current = null
  //   }
  // }, [titleState, contentState])

  // console.log('자동저장 ID: ', autoSaver.current)
  // console.log('타이틀: ', titleState)
  // console.log('내용: ', contentState)

  const onTyping = (e, type) => {
    if (type === TITLE) {
      setTitleState(e.target.value)
    } else if (type === CONTENT) {
      setContentState(e.target.value)
    }
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
      <Posting />
    </Wrapper>
  )
}

export default Writing
