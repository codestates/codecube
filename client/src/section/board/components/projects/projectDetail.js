import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const BackDrop = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  backdrop-filter: blur(2px);
`

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

const ProjectDetail = () => {
  const navigate = useNavigate()

  return (
    <BackDrop onClick={() => navigate('/')}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        모달창 바깥을 클릭해서 끄세요
      </Wrapper>
    </BackDrop>
  )
}

export default ProjectDetail
