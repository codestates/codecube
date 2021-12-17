import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  border-radius: 50%;
  &.main-profile {
    min-width: 12rem;
    max-width: 15rem;
    min-height: 12rem;
    max-height: 12rem;
    width: 60%;
    height: 35%;
    align-self: center;
  }
`

const ProfileImage = () => {
  return <Image className="main-profile" src="./dummy/profile1.jpeg"></Image>
}

export default ProfileImage
