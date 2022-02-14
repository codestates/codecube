import React from 'react'
import { NavLink } from 'react-router-dom'

import './toggle.css'

const Toggle = ({ isLoggedIn }) => {
  // ! 로그인 여부에 따라 개인 게시판 선택 유무를 클래스로만 나눴기 때문에 수정필요!
  const toggling = (e) => {
    if (!isLoggedIn) e.preventDefault()
  }

  return (
    <div className="toggle-wrapper">
      <NavLink
        defaultChecked
        end="/private"
        to=""
        className={({ isActive }) =>
          'nav-link' + ' mypage-btn' + (!isActive ? ' unselected' : ' selected')
        }
        onClick={toggling}
      >
        공개 게시판
      </NavLink>
      <NavLink
        to="/private"
        className={({ isActive }) =>
          'nav-link' + ' mypage-btn' + (!isActive ? ' unselected' : ' selected')
        }
        onClick={toggling}
      >
        개인 게시판
      </NavLink>
    </div>
  )
}

export default Toggle
