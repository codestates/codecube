import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { WISH_LIST } from '../hardWord'

import './postCard.css'

import publicDummy from '../../../dummy/board/publicDummy'
import wishListDummy from '../../../dummy/board/wishListDummy'

import { codeCubeApi } from '../axiosRequests'
import { hoToken } from '../hardWord'
import axios from 'axios'

const PublicList = ({ isWish }) => {
  const [publicList, setPublicList] = useState([])
  useEffect(() => {
    if (!isWish) {
      // TODO: API
      codeCubeApi('GET', '/projects', {}, hoToken).then(({ data }) => {
        setPublicList(data.list)
      })
    } else {
      setPublicList(wishListDummy)
    }
  }, [isWish])

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
                {/* 대기중: {post.confirmed}/{post.recruitment} */}
                대기중: {post.confirmed}/4
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PublicList
