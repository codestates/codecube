import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setProjectInfo, PROJECT_DETAIL } from '../../../actions/projectDetial'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 70%;
  height: 90%;
  border-radius: 20px;
  padding: 2rem 2rem 1rem 2rem;
  overflow: hidden;

  @keyframes appear {
    0% {
      transform: scale(98%);
    }
    40% {
      transform: scale(102%);
    }
    100% {
      transform: scale(100%);
    }
  }

  animation: appear 0.5s;

  &.write {
    position: relative;
    padding: 0;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const ContentP = styled.p`
  height: 100vh;
  line-height: 1.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  overflow: scroll;
  margin-bottom: 1rem;

  flex: 1 0 0%;
`

const Floor = styled.div`
  width: 40%;
  height: 0.3rem;
  border-radius: 15px;
  background-color: #00b0ff;
  margin-bottom: 3rem;
  opacity: 0;

  @keyframes appear-floor-top {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 40%;
    }
  }
  animation: appear-floor-top 1s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
`

const Floor2 = styled.div`
  width: 70%;
  height: 0.5rem;
  border-radius: 15px;
  background-color: #a6e3ff;
  align-self: center;
  opacity: 0;
  margin-bottom: 1rem;
  @keyframes appear-floor-bottom {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 70%;
    }
  }
  animation: appear-floor-bottom 0.8s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
`
const Exit = styled.p`
  font-size: 3rem;
  color: #e9e9e9;
  align-self: center;

  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: lightgray;
  }
`

const Content = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title, content } = useSelector((state) => state.projectDetailReducer)

  const onIndexPage = () => {
    navigate('/')
    window.localStorage.removeItem(PROJECT_DETAIL)
    dispatch(setProjectInfo({ title: '', content: '' }))
  }

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <Title>{title}</Title>
      <Floor />
      <ContentP>{content}</ContentP>
      <Floor2 />
      <Exit onClick={onIndexPage}>&times;</Exit>
    </Wrapper>
  )
}

export default Content
