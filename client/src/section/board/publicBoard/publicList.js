/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import '../card.css'
import publicDummy from '../../../dummy/board/publicDummy'

const PublicList = () => {
  const [publicPosts, setPublicPost] = useState([])

  useEffect(() => {
    // console.log('public list request!')
    setPublicPost(publicDummy)
  })

  return (
    <>
      {publicPosts.map((post) => {
        return (
          <div className="card" key={post.postId}>
            <h3>{post.title}</h3>
            <div>
              대기중: {post.confirmed}/{post.recruitment}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PublicList
