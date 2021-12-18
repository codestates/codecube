/* eslint-disable react/prop-types */

import React from 'react'
import '../card.css'

const PublicList = ({ publicPosts }) => {
  return (
    <>
      {publicPosts
        ? publicPosts.map((post) => {
            return (
              <div className="card" key={post.postId}>
                <h3>{post.title}</h3>
                <div>
                  대기중: {post.confirmed}/{post.recruitment}
                </div>
              </div>
            )
          })
        : null}
    </>
  )
}

export default PublicList
