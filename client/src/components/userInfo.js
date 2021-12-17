import React from 'react'
import styled from 'styled-components'

const UserInfoWrapper = styled.table`
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: space-around;
  border: 1px black solid;
  width: 80%;
  height: 50%;
`

const UserInfo = () => {
  return (
    <UserInfoWrapper>
      <tr>Stacks</tr>
      <tr>records</tr>
      <tr>Description</tr>
    </UserInfoWrapper>
  )
}

export default UserInfo
