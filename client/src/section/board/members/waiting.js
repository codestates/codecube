import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 } from 'uuid'

import { ACCEPT, REJECT } from '../../../extra/hardWord'
import styled from 'styled-components'

axios.defaults.withCredentials = true

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(0, 50, 98, 0.2);
  box-shadow: -7px -7px 10px white, 7px 7px 10px #cbced1;
  border-radius: 0.5rem;
  align-content: flex-start;
  justify-content: center;
  overflow-y: scroll;

  width: 100%;
  height: 100%;
  padding: 1rem;
`

const Card = styled.div`
  display: flex;
  background: hsl(0deg 0% 100%);
  box-shadow: 0 6px 12px -6px rgba(66, 63, 59, 0.3);
  border-radius: 0.5rem;
  justify-content: space-between;
  height: 5rem;
  width: 40%;
  min-width: 14rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  padding: 5px;
  font-size: 0.7rem;
  line-height: 1.1rem;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 55%;
`

const TemporaryProfileImage = styled.div`
  width: 50%;
  height: 100%;
  background-color: steelblue;
`

const ButtonWrapper = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 60%;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:focus,
  &:active,
  &:hover {
    background-color: ${(props) =>
      props.reject ? 'rgb(254, 46, 46)' : 'rgb(116, 182, 102)'};
  }
  transition: background-color 0.2s;
`

const Waiting = () => {
  const { isHost, myProject } = useSelector((state) => state.boardReducer)
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

  const [waitingUsers, setWaitingUsers] = useState([])
  const navigation = useNavigate()

  useEffect(async () => {
    if (!isLoggedIn) {
      navigation('/')
    } else {
      if (isHost) {
        await axios
          .get(process.env.REACT_APP_API__URL + '/members/' + myProject.host.projectId, {
            withCredentials: true,
          })
          .then(({ data }) => {
            setWaitingUsers(data.waiting)
          })
      }
    }
  }, [isHost, isLoggedIn])

  const onSelect = useCallback((userId, type, projectId) => {
    if (type === ACCEPT) {
      axios
        .put(
          process.env.REACT_APP_API__URL + '/members/join',
          { userId, projectId },
          {
            withCredentials: true,
          }
        )
        .then((data) =>
          setWaitingUsers((prevState) =>
            prevState.filter((user) => user.userId !== userId)
          )
        )
        .catch((err) => {
          if (err.response.status === 400) {
            alert('참가인원이 최대입니다')
          } else {
            console.log(err)
          }
        })
    } else {
      axios
        .delete(process.env.REACT_APP_API__URL + '/members/' + userId + '-' + projectId, {
          withCredentials: true,
        })
        .then((data) =>
          setWaitingUsers((prevState) =>
            prevState.filter((user) => user.userId !== userId)
          )
        )
    }
  }, [])

  return (
    <Wrapper>
      {!isHost ? (
        <div>작성한 게시글이 없습니다</div>
      ) : waitingUsers.length === 0 ? (
        <div>대기중인 인원이 없습니다</div>
      ) : (
        waitingUsers.map(({ username, userId, projectId }) => {
          return (
            <Card key={v4()}>
              <Profile>
                <TemporaryProfileImage />
                {username}
              </Profile>
              <ButtonWrapper>
                <Button onClick={() => onSelect(userId, ACCEPT, projectId)}>✔️</Button>
                <Button reject onClick={() => onSelect(userId, REJECT, projectId)}>
                  ✖️
                </Button>
              </ButtonWrapper>
            </Card>
          )
        })
      )}
    </Wrapper>
  )
}

export default Waiting
