import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { WISH_LIST } from '../hardWord'
import axios from 'axios'

import './postCard.css'

const PublicList = ({ isWish, wishList }) => {
  const [publicList, setPublicList] = useState([])
  useEffect(() => {
    if (!isWish) {
      axios
        .get('http://localhost:4000/projects')
        .then(({ data }) => {
          setPublicList(data.list)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      setPublicList(wishList.guest.wishList)
    }
  }, [isWish, wishList])

  return (
    <>
      {isWish ? (
        <div id="wish-list">
          <h2>{WISH_LIST}</h2>
        </div>
      ) : null}
      <div id="post-card-wrapper">
        {publicList.map((post) => {
          return (
            <div key={v4()} className="post-card">
              <h3>{post.title}</h3>
              <div>
                {post.confirmed ? `참여인원 ${post.confirmed}/ 4` : '자세히 보기👁‍🗨'}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PublicList
