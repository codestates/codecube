import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './toggle.css'

const Toggle = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

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
