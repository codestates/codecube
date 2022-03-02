import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { MdOutlineMail as ICON_mail, MdPhoneIphone as ICON_phone } from 'react-icons/md'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  padding: 2rem;
  margin-bottom: 1rem;
  border-radius: 20px;
  overflow: hidden;

  flex: 0.5 0 0%;
`

const Photo = styled.img`
  background-color: lightgray;
  border-radius: 50%;
  width: 20%;
  margin-right: 2rem;
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

const Blind = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);

  &:hover {
    cursor: pointer;
    & > p:before {
      color: #00b0ff;
    }
  }
`

const Indicator = styled.p`
  font-size: 1.3rem;
  &:before {
    transition: 0.3s;
    content: '로그인';
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
  const { isLoggedIn } = useSelector((state) => state.loginReducer)
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

  // 기본적으로 userInfo가 없는 상황이기때문에 주석처리했습니다.
  // const { id, username, email, oauth, description } = userInfo

  return (
    <Wrapper>
      <Photo src={require('../../../dummy/기본프로필.png')}></Photo>
      <UserInfo>
        <P className="name">{isLoggedIn ? userInfo.username : '이름'}</P>
        <ICON_mail style={style} />
        <P>{isLoggedIn ? userInfo.email : 'aa@code.com'}</P>
        <ICON_phone style={style} />
        <P>{isLoggedIn ? userInfo.description : '소개'}</P>
        {!isLoggedIn ? (
          <Blind>
            <Indicator> 후 이용가능합니다.</Indicator>
          </Blind>
        ) : null}
      </UserInfo>
    </Wrapper>
  )
}

export default User
