import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

const Wrapper = styled.div`
  background-color: white;

  width: 60vw;
  height: 80vh;

  cursor: default;
  text-align: center;
`

const H1 = styled.h1`
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 2rem 0;
`

const Content = styled.div`
  padding: 0 1rem;
`

const Modal = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const location = useLocation()

  useEffect(() => {
    const postId = location.pathname.split('/')[2]

    axios.get(process.env.REACT_APP_API__URL + `/projects/${postId}`).then(({ data }) => {
      setTitle(data.projectInfo.title)
      setContent(data.projectInfo.content)
    })
  }, [])

  return (
    <BackDrop to="/">
      <Wrapper onClick={(e) => e.preventDefault()}>
        <H1>{title}</H1>
        <Content>{content}</Content>
      </Wrapper>
    </BackDrop>
  )
}

export default Modal
