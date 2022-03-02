import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

const Wrapper = styled.div`
  position: relative;
  padding: 0 1rem;

  flex: 0.7 0 0%;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  text-align: center;
  height: 100%;
`

const Icon = styled(FontAwesomeIcon)`
  & {
    margin-right: 1rem;
    transition: 0.4s;
    cursor: pointer;
  }
  &:last-child {
    /* margin-right: 0; */
  }

  &.fa-power-off {
    color: #169b1e;
    &:hover {
      color: lightgray;
      transform: rotate(0.25turn);
    }
  }

  &.fa-square-plus {
    color: gray;
    &:hover {
      color: #00b0ff;
      color: inherit;
    }
  }
`

const LogIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d7d7d7;
  border-radius: 10px;
  width: 6rem;
  height: 100%;
  color: darkgray;

  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: inherit;
  }
`

const LogOut = styled(LogIn)`
  background-color: #d1d1d1;
  &:hover {
    background-color: #d7d7d7;
  }
`

const style = (isActive, isFiltering) => {
  isActive = isActive || isFiltering

  return {
    color: isActive ? '#00B0FF' : 'lightgray',
    fontSize: '1.5rem',
    textDecoration: 'none',
    marginRight: '1rem',
    transition: '0.3s',
  }
}

const Tab = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // isFiltering은 최신순/좋아요순으로 공개게시판을 새로 보여주기위해 사용되는 'filter/latest', 'filter/popular' url라우팅과정에서
  // css처리를 위해 사용됩니다. 라우팅코드는 client/src/section/board/index.js 에 현재 주석돼있습니다.
  const isFiltering = location.pathname.split('/')[1] === 'filter'

  const handleClick = async () => {
    await axios
      .get(serverUrl + '/logout')
      .then((res) => {
        window.localStorage.clear('userInfo')
        window.location.href = '/'
      })
      .catch((err) => {
        console.log('❗️로그아웃 실패\n', err)
      })
  }

  return (
    <Wrapper>
      <NavLink to="/" style={({ isActive }) => style(isActive, isFiltering)}>
        공개게시판
      </NavLink>
      <NavLink to="/job" style={({ isActive }) => style(isActive)}>
        채용공고
      </NavLink>
      <NavLink to="/myPage" style={({ isActive }) => style(isActive)}>
        마이페이지
      </NavLink>
      <IconWrapper>
        <Icon icon={faSquarePlus} size="2xl" onClick={() => navigate('/write')} />
        {/* <Icon icon={faPowerOff} size="2xl" onClick={handleClick} /> */}
        <LogIn onClick={() => navigate('/login')}>로그인</LogIn>
      </IconWrapper>
    </Wrapper>
  )
}

export default Tab
