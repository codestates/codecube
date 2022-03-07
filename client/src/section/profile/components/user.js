import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { MdOutlineMail as ICON_mail } from 'react-icons/md'
import { HiSpeakerphone as ICON_desc } from 'react-icons/hi'

const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

const Wrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;

  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 20px;

  flex: 0.5 0 0%;
`

const Photo = styled.img`
  background-color: lightgray;
  border-radius: 50%;
  margin-right: 2rem;

  width: 33%;
`

const UserInfo = styled.div`
  width: 100px;

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

export const Blind = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);

  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transform: scale(102%);

    cursor: pointer;
    & > p:before {
      color: #00b0ff;
    }
  }
`

export const Indicator = styled.p`
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
  const { isLoggedIn, username, email, description } = useSelector(
    (state) => state.loginReducer
  )

  const handleDelete = () => {
    axios
      .delete(serverUrl + '/projects')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.status))
  }

  const navigate = useNavigate()

  return (
    <Wrapper>
      <Photo src={require('../../../dummy/spongebob.jpg')}></Photo>

      <UserInfo>
        <P className="name">{isLoggedIn ? username : '이름'}</P>
        <ICON_mail style={style} />
        <P>{isLoggedIn ? email : 'aa@code.com'}</P>
        <ICON_desc style={style} />
        <P>{isLoggedIn ? description : '소개'}</P>
        <button onClick={handleDelete}>내글삭제(테스트중)</button>
        {!isLoggedIn ? (
          <Blind onClick={() => navigate('/login')}>
            <Indicator> 후 이용가능합니다.</Indicator>
          </Blind>
        ) : null}
      </UserInfo>
    </Wrapper>
  )
}

export default User
