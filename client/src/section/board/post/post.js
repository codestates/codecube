import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'

import './post.css'
import ConfirmUsers from '../members/confirm'
import PostContent from './content'

axios.defaults.withCredentials = true

const PostWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const WaitingUserPage = styled(Link)`
  position: absolute;
  bottom: 10px;
  left: 1.5rem;
  width: 7rem;

  background-color: #ff9900;
  box-shadow: 1px 1px 2px white, -1px -1px 2px #cbced1;
  padding: 0.3rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.7rem;

  text-decoration: none;
  color: inherit;

  cursor: pointer;
`

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
    <PostWrapper>
      <PostContent thisPost={thisPost} />
      <ConfirmUsers projectId={myProject.host.projectId} />

      <WaitingUserPage to="waiting">신청 현황</WaitingUserPage>
    </PostWrapper>
  )
}

export default Post
