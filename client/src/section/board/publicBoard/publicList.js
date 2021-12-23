import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { WISH_LIST } from '../hardWord'
import axios from 'axios'

import './postCard.css'

const PublicList = ({ isWish, wishList }) => {
  const [publicList, setPublicList] = useState([{}])

  useEffect(() => {
    if (!isWish) {
      axios
        .get(process.env.REACT_APP_API_URL + '/projects')
        .then(({ data }) => {
          setPublicList(data.list)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      if (!wishList.guest.wishList.length) {
        setPublicList(wishList.guest.confirmed)
      } else {
        setPublicList(wishList.guest.wishList)
      }
    }
  }, [isWish, wishList])

  return (
    <>
      {isWish && Array.isArray(publicList) ? (
        <div id="wish-list">
          <h2>{WISH_LIST}</h2>
        </div>
      ) : null}
      <div id="post-card-wrapper">
        {Array.isArray(publicList) ? (
          publicList.map((post) => {
            return (
              <div key={v4()} className="post-card">
                <h3>{post.title}</h3>
                <div>
                  {post.confirmed ? `참여인원 ${post.confirmed}/ 4` : '자세히 보기👁‍🗨'}
                </div>
              </div>
            )
          })
        ) : (
          <div id="wish-list">
            <h2>참가중인 프로젝트</h2>
            <div className="post-card">
              <div>{publicList.title}</div>
              자세히 보기👁‍🗨
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PublicList
