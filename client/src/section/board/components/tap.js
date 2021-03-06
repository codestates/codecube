import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { handleLoggedOut } from '../../../actions/login'

const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

const Wrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  margin-bottom: 1rem;

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
  margin-right: 1rem;
  transition: 0.4s;
  height: 100%;
  cursor: pointer;

  &:last-child {
    /* margin-right: 0; */
  }

  /* &.fa-power-off {
    color: #169b1e;
    &:hover {
      color: lightgray;
      transform: rotate(0.25turn);
    }
  } */

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
  background-color: #eeeeee;
  border-radius: 10px;
  width: 6rem;
  height: 100%;
  color: gray;

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
    color: darkgray;
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
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

  // isFiltering은 최신순/좋아요순으로 공개게시판을 새로 보여주기위해 사용되는 'filter/latest', 'filter/popular' url라우팅과정에서
  // css처리를 위해 사용됩니다. 라우팅코드는 client/src/section/board/index.js 에 현재 주석돼있습니다.
  const isFiltering = location.pathname.split('/')[1] === 'filter'

  const onLogOut = async () => {
    await axios
      .get(serverUrl + '/logout')
      .then((res) => {
        window.localStorage.clear('userInfo')
        dispatch(handleLoggedOut())
      })
      .catch((err) => {
        console.log('❗️로그아웃 실패\n', err)
      })
  }

  const onWrite = () => {
    navigate('/write')
    // if (isLoggedIn) navigate('/write')
    // else {
    // }
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
        <Icon icon={faSquarePlus} size="2xl" onClick={onWrite} />
        {isLoggedIn ? (
          <LogOut onClick={onLogOut}> 로그아웃</LogOut>
        ) : (
          <LogIn onClick={() => navigate('/login')}>로그인</LogIn>
        )}
      </IconWrapper>
    </Wrapper>
  )
}

export default Tab
