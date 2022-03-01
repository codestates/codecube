import React from 'react'
import styled from 'styled-components'

import { MdOutlineMail as ICON_mail, MdPhoneIphone as ICON_phone } from 'react-icons/md'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  padding: 1rem;

  flex: 0.5 0 0%;
`

const Photo = styled.img`
  border-radius: 50%;
  width: 33%;
  height: 100%;
  margin-right: 1rem;
`

const UserInfo = styled.div`
  width: 100px;
  padding: 0 1rem;

  flex: 1 0 0%;
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

const style = {
  color: '00B0FF',
  width: '1.3rem',
  height: '1.3rem',
  position: 'absolute',
  transform: 'translateY(-25%)',
}

const User = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const { id, username, email, oauth, description } = userInfo
  console.log('렌더링됨')
  return (
    <Wrapper>
      <Photo src={require('../../../dummy/spongebob.jpg')}></Photo>
      <UserInfo>
        <P className="name">{username}</P>
        <ICON_mail style={style} />
        <P>{email}</P>
        <ICON_phone style={style} />
        <P>{description}</P>
      </UserInfo>
    </Wrapper>
  )
}

export default User
