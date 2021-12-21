import React from 'react'
import styled from 'styled-components'

import ProfileImage from '../../components/profileImage'
import UserInfo from '../../components/userInfo'

const logoStyle = {
  width: '30%',
  height: '3rem',
  alignSelf: 'center',
}

const Profile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const AfterLogin = () => {
  return (
    <Profile>
      {/* <img src="./dummy/codecubelogo.png" style={logoStyle} /> */}
      {/* <ProfileImage /> */}
      <UserInfo />
    </Profile>
  )
}

export default AfterLogin
