import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PostCard, PostCardWrapper } from './publciList'

const WishListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  & > h2 {
    margin: 0 0 1rem 0;
  }
`

const WishList = () => {
  const [postPath, _set] = useState('/1') // ! 테스트용 상태입니다.

  const { myProject } = useSelector((state) => state.boardReducer)
  const [_, setState] = useState(false)

  useEffect(() => {
    setState((prevState) => !prevState)
  }, [myProject])

  return (
    <PostCardWrapper>
      {!myProject.guest.confirmed.projectId ? (
        <WishListWrapper>
          <h2>수락 대기중</h2>
          {myProject.guest.wishList.length
            ? myProject.guest.wishList.map((post) => {
                return (
                  <PostCard to={`/post${postPath}`} key={v4()}>
                    <h3>{post.title}</h3>
                    <div>{`참여인원 ${post.confirmed}/ 4`}</div>
                  </PostCard>
                )
              })
            : null}
        </WishListWrapper>
      ) : (
        <WishListWrapper>
          <h2>참가중인 프로젝트</h2>
          <PostCard to={`/post${postPath}`}>
            <div>{myProject.guest.confirmed.title}</div>
            자세히 보기👁‍🗨
          </PostCard>
        </WishListWrapper>
      )}
    </PostCardWrapper>
  )
}

export default WishList
