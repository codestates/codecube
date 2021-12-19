/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { PRIVATE_BOARD } from '../../section/board/board'

import './toggle.css'

const Toggle = ({ isLoggedIn, left, right, subLinkLeft, subLinkRight, isPrivate }) => {
  // ! 로그인 여부에 따라 개인 게시판 선택 유무를 클래스로만 나눴기 때문에 수정필요!
  const toggling = useCallback(
    (e) => {
      if (!isLoggedIn && right === PRIVATE_BOARD) {
        e.preventDefault()
      }
    },
    [isLoggedIn]
  )

  const leftLink = `${subLinkLeft}`
  const rightLink = `${subLinkRight}`

  return (
    <div className={`toggle-wrapper ${isPrivate}`}>
      <NavLink to={leftLink} className={({ isActive }) => 'nav-link' + (!isActive ? ' unselected' : '')}>
        {left}
      </NavLink>
      <NavLink
        to={rightLink}
        className={({ isActive }) => 'nav-link' + (!isActive ? ' unselected' : '')}
        onClick={toggling}
      >
        {right}
      </NavLink>
    </div>
  )
}

export default Toggle
