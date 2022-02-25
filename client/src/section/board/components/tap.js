import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0 1rem;

  flex: 0.7 0 0%;
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
  const location = useLocation()
  const isFiltering = location.pathname.split('/')[1] === 'filter'
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
    </Wrapper>
  )
}

export default Tab
