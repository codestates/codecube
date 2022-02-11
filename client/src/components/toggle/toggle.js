import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { PRIVATE_BOARD } from '../../section/board/hardWord'

import './toggle.css'

const Toggle = ({
  isLoggedIn,
  leftName,
  rightName,
  leftLink,
  rightLink,
  privateClass,
}) => {
  // ! 로그인 여부에 따라 개인 게시판 선택 유무를 클래스로만 나눴기 때문에 수정필요!
  const toggling = useCallback(
    (e) => {
      if (!isLoggedIn && rightName === PRIVATE_BOARD) {
        e.preventDefault()
      }
    },
    [isLoggedIn]
  )

  return (
    <div className={`toggle-wrapper ${privateClass}`}>
      <NavLink
        defaultChecked
        end="/private"
        to={leftLink}
        className={({ isActive }) =>
          'nav-link' + ' mypage-btn' + (!isActive ? ' unselected' : ' selected')
        }
        onClick={toggling}
      >
        {leftName}
      </NavLink>
      <NavLink
        to={rightLink}
        className={({ isActive }) =>
          'nav-link' + ' mypage-btn' + (!isActive ? ' unselected' : ' selected')
        }
        onClick={toggling}
      >
        {rightName}
      </NavLink>
    </div>
  )
}

export default Toggle
