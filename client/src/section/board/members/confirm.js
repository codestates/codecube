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
            <UserProfile>{user.image}</UserProfile>
            <div>{user.username}</div>
          </UserWrapper>
        )
      })}
    </Wrapper>
  )
}

export default ConfirmUsers
