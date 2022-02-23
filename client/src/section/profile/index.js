import React from 'react'
import styled from 'styled-components'

import { IconContext } from 'react-icons/lib'
import { MdOutlineMail, MdPhoneIphone } from 'react-icons/md'

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1.2 0 0%;
  border-radius: 15px;
  background-color: white;
  margin-right: 1rem;
`

const Logo = styled.img`
  margin: 1.5rem 0;
  width: 50%;
  align-self: center;
`

const User = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
`

const Photo = styled.img`
  border-radius: 50%;
  width: 40%;
  height: 100%;

  margin-right: 1rem;
`

const UserInfo = styled.div`
  width: 100px;
  flex: 1 0 0%;
  padding: 0 1rem;
`

const P = styled.p`
  margin-bottom: 1rem;
  font-size: 12px;
  color: gray;
  padding-left: 2rem;

  &.name {
    margin-bottom: 1.5rem;
    padding-left: 0;
    font-size: 1.3rem;
    color: inherit;
  }
`

const Profile = () => {
  return (
    <IconContext.Provider value={{ color: '00B0FF', size: '1.3rem' }}>
      <ProfileWrapper>
        <Logo src={require('../../dummy/로고.png')}></Logo>
        <User>
          <Photo src={require('../../dummy/spongebob.jpg')}></Photo>
          <UserInfo>
            <P className="name">김 식</P>
            <MdOutlineMail
              style={{ position: 'absolute', transform: 'translateY(-25%)' }}
            />
            <P>abc@code.com</P>
            <MdPhoneIphone
              style={{ position: 'absolute', transform: 'translateY(-25%)' }}
            />
            <P>010-1234-1234</P>
          </UserInfo>
        </User>
      </ProfileWrapper>
    </IconContext.Provider>
  )
}

export default Profile
