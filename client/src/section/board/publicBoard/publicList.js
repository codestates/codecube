import React from 'react'
import { v4 } from 'uuid'

import './postCard.css'

const WISH_LIST = '수락 대기중'

const PublicList = ({ list, isWish }) => {
  return (
    <>
      {isWish ? (
        <div id="wish-list">
          <h2>{WISH_LIST}</h2>
        </div>
      ) : null}
      <div id="post-card-wrapper">
        {list.map((post) => {
          return (
            <div key={v4()} className="post-card">
              <h3>{post.title}</h3>
              <div>
                대기중: {post.confirmed}/{post.recruitment}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PublicList
