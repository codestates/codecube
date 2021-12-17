import React from 'react'
import styled from 'styled-components'

import ProfileImage from '../../components/profileImage'

const logoStyle = {
  width: '30%',
  height: '3rem',
  alignSelf: 'center',
  margin: '.5rem 0 1rem 0',
}

const Profile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const AfterLogin = () => {
  return (
    <Profile>
      <img src="./dummy/codecubelogo.png" style={logoStyle} />
      <ProfileImage />
      <div>Stacks</div>
      <div>Description</div>
    </Profile>
  )
}

export default AfterLogin
