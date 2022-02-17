import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BackDrop = styled(Link)`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);

  width: 100vw;
  height: 100vh;
  cursor: default;

  text-decoration: none;
  color: inherit;
`

const Content = styled.div`
  background-color: white;

  width: 60vw;
  height: 80vh;

  cursor: default;
  text-align: center;
`

const Modal = () => {
  return (
    <BackDrop to="/">
      <Content onClick={(e) => e.preventDefault()}>
        <h1>모달창 테스트</h1>
      </Content>
    </BackDrop>
  )
}

export default Modal
