import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import './post.css'
import ConfirmUsers from '../members/confirm'
import PostContent from './content'

axios.defaults.withCredentials = true
const Post = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [thisPost, setThisPost] = useState({ title: '', content: '' })

  useEffect(async () => {
    const url = process.env.REACT_APP_API__URL + '/projects/' + myProject.host.projectId
    await axios
      .get(url, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setThisPost(data.projectInfo)
      })
  }, [])
  return (
    <div id="post-wrapper">
      <PostContent thisPost={thisPost} />
      <ConfirmUsers projectId={myProject.host.projectId} />
    </div>
  )
}

export default Post
