import React from 'react'
import styled from 'styled-components'

import { FaCog } from 'react-icons/fa'
import { Wrapper } from '../job'
const ICON_cog = styled(FaCog)`
  width: 17%;
  height: 17%;
  color: #00b0ff;

  @keyframes spin {
    to {
      transform: rotate(0turn);
    }
    from {
      transform: rotate(1turn);
    }
  }
  animation: spin 4s infinite;
`

const MyPage = () => {
  return (
    <Wrapper
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ICON_cog />
      <br />
      준비중 입니다!
    </Wrapper>
  )
}
export default MyPage
