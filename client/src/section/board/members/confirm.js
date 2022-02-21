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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: rgb(107, 130, 168);
  border-radius: 0.5rem;
  width: 5rem;
  height: 100%;

  margin: 0 0.8rem;

  .hover {
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
  }

  &:hover {
    .hover {
      opacity: 1;
      pointer-events: auto;
    }
  }
`

const Out = styled.button`
  width: 3.5rem;
  height: 2rem;
  cursor: pointer;
`

const UserProfile = styled.div`
  width: 100%;
`

const ConfirmUsers = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [confirmUsers, setConfirmUsers] = useState([])

  const handleExclude = (user) => {
    const { userId, projectId } = user
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
  }

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/members/' + myProject.host.projectId, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const hostUserId = JSON.parse(window.localStorage.getItem('userinfo')).id
        const confirmed = data.confirmed.filter((el) => el.userId !== hostUserId)
        setConfirmUsers(confirmed)
      })
  }, [])

  const handleImgError = (e) => {
    e.target.src = require('../../../default.jpeg')
  }
  const image = `https://codecube-image.s3.ap-northeast-2.amazonaws.com/`

  return (
    <Wrapper>
      {confirmUsers.map((user) => {
        return (
          <UserWrapper key={v4()}>
            <div>
              <img
                src={image + user.userId}
                width="40px"
                height="30px"
                onError={handleImgError}
              />
            </div>
            <Out onClick={() => handleExclude(user)} className="hover">
              제외
            </Out>
            <div className="hover">{user.username}</div>
            <UserProfile></UserProfile>
          </UserWrapper>
        )
      })}
    </Wrapper>
  )
}

export default ConfirmUsers
