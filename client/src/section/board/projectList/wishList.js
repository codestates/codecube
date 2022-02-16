import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { CONFIRM_WAITING } from '../../../extra/hardWord'

import './postCard.css'
import { useSelector } from 'react-redux'

const WishList = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [_, setState] = useState(false)

  useEffect(() => {
    setState((prevState) => !prevState)
  }, [myProject])

  return (
    <>
      <div id="post-card-wrapper">
        {!myProject.guest.confirmed.projectId ? (
          <div id="wish-list">
            <h2>수락 대기중</h2>
            {myProject.guest.wishList.map((post) => {
              return (
                <div key={v4()} className="post-card">
                  <h3>{post.title}</h3>
                  <div>{`참여인원 ${post.confirmed}/ 4`}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div id="wish-list">
            <h2>참가중인 프로젝트</h2>
            <div className="post-card">
              <div>{myProject.guest.confirmed.title}</div>
              자세히 보기👁‍🗨
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default WishList
