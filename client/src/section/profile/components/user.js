import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IconContext } from 'react-icons/lib'
import { MdOutlineMail as ICON_mail, MdPhoneIphone as ICON_phone } from 'react-icons/md'

const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

const Wrapper = styled.div`
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

const Logout = styled.button`
  margin-bottom: 1rem;
  font-size: 12px;
  color: gray;
  padding-left: 2rem;
`

const User = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const { id, username, email, oauth, description } = userInfo
  const handleClick = async () => {
    await axios
      .get(serverUrl + '/logout')
      .then((res) => {
        window.localStorage.clear('login')
        window.localStorage.clear('userInfo')
        window.location.href = '/'
      })
      .catch((err) => {
        console.log('❗️로그아웃 실패\n', err)
      })
  }
  return (
    <IconContext.Provider value={{ color: '00B0FF', size: '1.3rem' }}>
      <Wrapper>
        <Photo src={require('../../../dummy/spongebob.jpg')}></Photo>
        <UserInfo>
          <P className="name">{username}</P>
          <ICON_mail style={{ position: 'absolute', transform: 'translateY(-25%)' }} />
          <P>{email}</P>
          <ICON_phone style={{ position: 'absolute', transform: 'translateY(-25%)' }} />
          <P>{description}</P>
          <Logout onClick={handleClick}>로그아웃</Logout>
        </UserInfo>
      </Wrapper>
    </IconContext.Provider>
  )
}

export default User
