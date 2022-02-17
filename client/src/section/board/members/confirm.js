import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'

import axios from 'axios'
import styled from 'styled-components'

axios.defaults.withCredentials = true

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  background-color: rgba(0, 50, 98, 0.2);
  box-shadow: inset 1.5px 1.5px 5px rgba(0, 50, 98, 0.2),
    inset -1.5px -1.5px 5px rgba(248, 249, 250, 0.7);
  border-radius: 0.5rem;
  height: 20%;
  padding: 0.5rem;
  align-items: center;
`

const UserWrapper = styled.div`
  background-color: rgb(107, 130, 168);
  border-radius: 0.5rem;
  max-width: 5rem;
  min-width: 5rem;
  height: 100%;
  text-align: center;
  margin: 0 0.8rem;
  font-size: 0.7rem;
`

const UserProfile = styled.div`
  width: 100%;
  height: 67.5%;
`

const ConfirmUsers = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [confirmUsers, setConfirmUsers] = useState([])

  const handleExclude = (user) => {
    //클릭하면 1. 타겟을 셀렉트함
    const { userId, projectId } = user
    //2. axios요청으로 join부분을 1 -> 0으로 바꿔야함
    axios
      .put(
        process.env.REACT_APP_API__URL + '/members/exclude',
        { userId, projectId },
        {
          withCredentials: true,
        }
      )
      .then((data) =>
        setConfirmUsers((prevState) => prevState.filter((user) => user.userId !== userId))
      )
    //2. 요청이 잘 완료됐다면 confirmUsers에서 필터로 줄여줘야함
  }

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/members/' + myProject.host.projectId, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setConfirmUsers(data.confirmed)
      })
  }, [])

  return (
    <Wrapper>
      {confirmUsers.map((user) => {
        return (
          <UserWrapper key={v4()}>
            {/* <img className="user-profile" src={user.img}></img> */}
            <button onClick={() => handleExclude(user)}>제외</button>
            <UserProfile>{user.image}</UserProfile>
            <div>{user.username}</div>
          </UserWrapper>
        )
      })}
    </Wrapper>
  )
}

export default ConfirmUsers
