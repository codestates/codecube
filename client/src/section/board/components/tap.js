import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0 1rem;

  flex: 1 0 0%;
`
const style = (isActive) => {
  return {
    color: isActive ? '#00B0FF' : 'lightgray',
    fontSize: '1.5rem',
    textDecoration: 'none',
    marginRight: '1rem',
    transition: '0.3s',
  }
}

const Tab = () => {
  return (
    <Wrapper>
      <NavLink to="/" style={({ isActive }) => style(isActive)}>
        공개게시판
      </NavLink>
      <NavLink to="/job" style={({ isActive }) => style(isActive)}>
        채용공고
      </NavLink>
      <NavLink to="/myPage" style={({ isActive }) => style(isActive)}>
        마이페이지
      </NavLink>
    </Wrapper>
  )
}

export default Tab
