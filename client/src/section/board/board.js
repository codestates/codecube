/* eslint-disable react/prop-types */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './board.css'
import Toggle from '../../components/toggle/toggle'
import PublicList from './publicBoard/publicList'
import PrivateList from './privateBoard/privateList'
import Post from './post'

const PUBLIC_BOARD = '공개게시판'
export const PRIVATE_BOARD = '개인게시판'
const PRIVATE_LINK = '/private'

const Board = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <div id="board-wrapper">
        <Toggle
          isLoggedIn={isLoggedIn}
          left={PUBLIC_BOARD}
          right={PRIVATE_BOARD}
          subLinkLeft=""
          subLinkRight={PRIVATE_LINK}
        />
        <div id="board-list">
          <Routes>
            <Route path="/" element={<PublicList />} />
            <Route path="/private/*" element={<PrivateList />}>
              <Route path="" element={<Post />} />
              <Route path="waiting" element={<div>waiter</div>} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Board
