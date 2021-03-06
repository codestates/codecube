import React from 'react'
import styled from 'styled-components'

import User from './components/user'
import Menu from './components/menu'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 15px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0 1rem 1rem 1rem;

  width: 33%;
  flex: 1 0 0%;
`

const Logo = styled.img`
  width: 35%;
  align-self: center;

  flex: 0.3 0 0%;
`

const Profile = () => {
  return (
    <Wrapper>
      <Logo src={require('../../dummy/로고.png')}></Logo>
      <User />
      <Menu />
    </Wrapper>
  )
}

export default Profile
