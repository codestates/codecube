import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: white;
  margin-right: 1.2rem;

  transition: 0.4s;
  overflow: hidden;

  &:hover {
    transform: translateY(-1.7%) scale(1.03);
  }

  flex: 1 0 0%;
`

const Thumbnail = styled.img`
  width: 100%;
  flex: 1 0 0%;
`

const Spoiler = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem;

  flex: 1.3 0 0%;

  h1 {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0.6rem 0;
  }
  p {
    font-size: 0.8rem;
    line-height: 1rem;
    color: gray;
    /* height: 20%; */
  }
`

const Detail = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13%;
  background-color: white;
  font-size: 0.7rem;
  color: gray;

  cursor: pointer;
  transition: background-color 0.4s;
  &:hover {
    background-color: #0070bb;
    color: white;
  }
`

const Post = () => {
  return (
    <Wrapper>
      <Thumbnail src={require('../../../../dummy/뚱이.png')} />
      <Spoiler>
        <h1>테스트 타이틀입니다</h1>
        <p>
          누구나 사용할 수 있고, 언제나 사용할 수 있고, 실시간 소통이 가능한 디자인 툴을
          만들겁니다. 열정이 있고, 직면한 문제를 반드시 해결하고자하는 마인드를 가졌다면
          신청해주세요!
        </p>
      </Spoiler>
      <Detail>자세히 보기</Detail>
    </Wrapper>
  )
}

export default Post
