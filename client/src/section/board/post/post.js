import React, { useEffect, useState } from 'react'

import './post.css'
import ConfirmUsers from '../members/confirm'
import PostContent from './content'

import { thisPostDummy } from '../../../dummy/board/privateDummy'

const Post = ({ postId }) => {
  const [thisPost, setThisPost] = useState({ title: '', content: '' })
  useEffect(() => {
    // TODO: API 유저 아이디를 기반으로
    setThisPost(thisPostDummy)
  }, [])
  return (
    <div id="post-wrapper">
      <PostContent thisPost={thisPost} />
      <ConfirmUsers postId={postId} />
    </div>
  )
}

export default Post
