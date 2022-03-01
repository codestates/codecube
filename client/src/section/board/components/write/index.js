import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BackDrop, Wrapper } from '../projects/projectDetail'

const Title = styled.input.attrs({
  type: 'text',
  placeholder: '제목을 입력하세요',
  autoFocus: 'autoFocus',
})`
  font-size: 3rem;
  margin-bottom: 1rem;
  border: none;
  outline: none;
`
const Floor = styled.div`
  background-color: #202020;
  width: 20%;
  height: 0.5rem;
  margin-top: 0.3rem;
  margin-bottom: 3rem;
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
  margin-bottom: 1rem;
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

  & > div {
    display: flex;
    width: 6.5rem;
    height: 3.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    cursor: pointer;
    transition: 0.4s;
  }
`

const Exit = styled.div`
  background-color: #f7f7f7;
  &:hover {
    background-color: #f1f1f1;
  }
`
const Create = styled.div`
  position: absolute;
  right: 0;

  background-color: #00b0ff;
  color: white;
  &:hover {
    transform: scale(103%);
  }
`

const Write = () => {
  const navigate = useNavigate()
  const contentRef = useRef(null)

  return (
    <BackDrop>
      <Wrapper>
        <Title />
        <Floor />
        <Content
          ref={contentRef}
          onChange={(e) => console.log(contentRef.current.value)}
        />
        <Floor2 />
        <Footer>
          <Exit onClick={() => navigate('/')}>나가기</Exit>
          <Create>작성하기</Create>
        </Footer>
      </Wrapper>
    </BackDrop>
  )
}

export default Write
