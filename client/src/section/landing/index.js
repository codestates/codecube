import React from 'react'
import styled from 'styled-components'
import Login from './components/login'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Logo = styled.img`
  width: 15%;
  align-self: center;
  flex: 1 0 0%;
`

const Visual = styled.div`
  display: flex;

  flex: 15 0 0%;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1.5 0 0%;
`

const LandingPage = () => {
  return (
    <Wrapper>
      <Logo src={require('../../dummy/로고.png')} />
      <Visual>
        <ImageWrapper>
          <img
            src={require('../../dummy/랜딩페이지이미지.png')}
            style={{ width: '100%' }}
          ></img>
        </ImageWrapper>
        <Login />
      </Visual>
    </Wrapper>
  )
}

export default LandingPage
