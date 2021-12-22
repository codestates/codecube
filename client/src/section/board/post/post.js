import React, { useEffect, useState } from 'react'

import './post.css'
import ConfirmUsers from '../members/confirm'
import PostContent from './content'

import axios from 'axios'
import { localhost } from '../hardWord'

const initialPostInfo = { title: '', content: '' }

const Post = ({ projectId }) => {
  const [thisPost, setThisPost] = useState(initialPostInfo)

  useEffect(async () => {
    const url = `${localhost}/projects/${projectId}`
    await axios.get(url).then(({ data }) => {
      setThisPost(data.projectInfo)
    })
  }, [])
  return (
    <div id="post-wrapper">
      <PostContent thisPost={thisPost} />
      <ConfirmUsers projectId={projectId} />
    </div>
  )
}

export default Post
