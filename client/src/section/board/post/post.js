import React from 'react'

import './post.css'
import ConfirmUsers from '../members/confirm'
import PostContent from './content'

const Post = ({ thisPost, confirmUsers }) => {
  return (
    <div id="post-wrapper">
      <PostContent thisPost={thisPost} />
      <ConfirmUsers confirmUsers={confirmUsers} />
    </div>
  )
}

export default Post
