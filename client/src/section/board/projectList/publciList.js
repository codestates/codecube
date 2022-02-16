import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import axios from 'axios'

import styled from 'styled-components'

export const PostCardWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  background: hsl(0deg 0% 100%);
  box-shadow: 0 6px 12px -6px rgba(66, 63, 59, 0.3);
  padding: 5px;
  width: 100%;
  height: 4rem;
  text-align: center;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  font-size: 0.5rem;

  & > h3 {
    font-size: 0.8rem;
  }
`

const PublicList = () => {
  const [publicList, setPublicList] = useState([{}])

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
            <PostCard key={v4()}>
              <h3>{post.title}</h3>
              <div>{`참여인원 ${post.confirmed}/ 4`}</div>
            </PostCard>
          )
        })}
      </PostCardWrapper>
    </>
  )
}

export default PublicList
