import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { v4 } from 'uuid'
import axios from 'axios'

import styled from 'styled-components'

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const PostCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-self: center;
  background: hsl(0deg 0% 100%);
  box-shadow: 0 6px 12px -6px rgba(66, 63, 59, 0.3);
  padding: 5px;
  width: 97%;

  text-align: center;
  margin-bottom: 1rem;

  border-radius: 0.5rem;
  font-size: 0.5rem;
  text-decoration: none;
  color: inherit;

  transition: 0.3s;

  &:hover {
    width: 100%;
  }

  & > h3 {
    font-size: 0.8rem;
  }
`

const PublicList = () => {
  const [publicList, setPublicList] = useState([{}])
  const [postPath, _] = useState('/1') // ! 테스트용 상태입니다.

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API__URL + '/projects')
      .then(({ data }) => {
        setPublicList(data.list)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <PostCardWrapper>
        {publicList.map((post) => {
          return (
            <PostCard to={`post${postPath}`} key={v4()}>
              <h3>{post.title}</h3>
              <div>{`참여인원 ${post.confirmed}/ 4`}</div>
            </PostCard>
          )
        })}
      </PostCardWrapper>
      <Outlet />
    </>
  )
}

export default PublicList
