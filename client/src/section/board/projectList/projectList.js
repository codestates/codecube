import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { CONFIRM_WAITING } from '../../../extra/hardWord'
import axios from 'axios'

import './postCard.css'

const ProjectList = ({ isWishPage, wishList }) => {
  const [publicList, setPublicList] = useState([{}])

  useEffect(() => {
    if (!isWishPage) {
      axios
        .get(process.env.REACT_APP_API__URL + '/projects')
        .then(({ data }) => {
          setPublicList(data.list)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      // ! 수정 필요
      if (!wishList.guest.wishList.length) {
        setPublicList(wishList.guest.confirmed)
      } else {
        setPublicList(wishList.guest.wishList)
      }
    }
  }, [wishList])

  return (
    <>
      {isWishPage && Array.isArray(publicList) ? (
        <div id="wish-list">
          <h2>{CONFIRM_WAITING}</h2>
        </div>
      ) : null}
      <div id="post-card-wrapper">
        {Array.isArray(publicList) ? (
          publicList.map((post) => {
            return (
              <div key={v4()} className="post-card">
                <h3>{post.title}</h3>
                <div>{`참여인원 ${post.confirmed}/ 4`}</div>
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

export default ProjectList
