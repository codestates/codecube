import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Bar from './bar'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex: 12 0 0%;
`

const FilterWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 3%;
  right: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 17%;
`

const style = (isActive, isIndex) => {
  isActive = isActive || isIndex
  return {
    fontSize: '0.7rem',
    textDecoration: 'none',
    color: isActive ? 'tomato' : 'lightgray',
  }
}

const Public = () => {
  const location = useLocation()
  const isIndex = location.pathname === '/'

  return (
    <Wrapper>
      <Bar />
      {/* <FilterWrapper>
        <NavLink to="filter/latest" style={({ isActive }) => style(isActive, isIndex)}>
          최신순
        </NavLink>
        <NavLink to="filter/popular" style={({ isActive }) => style(isActive)}>
          좋아요순
        </NavLink>
      </FilterWrapper> */}
      <Outlet />
    </Wrapper>
  )
}

export default Public
