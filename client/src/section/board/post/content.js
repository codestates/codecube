import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: rgba(0, 50, 98, 0.2);
  box-shadow: -7px -7px 10px white, 7px 7px 10px #cbced1;
  height: 80%;
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
  border-radius: 0.5rem;

  & > h1 {
    font-size: 1.5rem;
    margin: 0.4rem 0 1rem 0;
  }

  &.limit {
    overflow-y: hidden;
  }
`

const Content = styled.div`
  line-height: 1.5rem;
  border-bottom: 1px solid rgb(0, 50, 98);
  border-top: 1px solid rgb(0, 50, 98);
  padding: 1rem 0;
`

const ButtonBackDrop = styled.div`
  position: absolute;
  z-index: 997;
  background-color: rgba(133, 133, 133, 0.8);
  width: 100%;
  height: 15%;
  bottom: 0px;
  left: 0px;
`

const ShowAll = styled.button`
  position: absolute;
  z-index: 999;
  height: 2rem;
  bottom: 10px;
  left: 50%;
  border: none;
  outline: none;
  width: 5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  transform: translate(-50%, 0);

  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: lightgray;
  }
`

const PostContent = ({ thisPost }) => {
  const { title, content } = thisPost

  const contentWrapper = useRef()
  const buttonBackdrop = useRef()
  const showAllButton = useRef()

  const showAll = useCallback(() => {
    contentWrapper.current.classList.remove('limit')
    buttonBackdrop.current.classList.add('hidden')
    showAllButton.current.classList.add('hidden')
  }, [])

  return (
    <Wrapper ref={contentWrapper} className="limit">
      <h1>{title}</h1>
      <Content>{content}</Content>
      <ButtonBackDrop ref={buttonBackdrop}>
        <ShowAll ref={showAllButton} onClick={showAll}>
          모두보기
        </ShowAll>
      </ButtonBackDrop>
    </Wrapper>
  )
}

export default PostContent
