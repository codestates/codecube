import React from 'react'
import styled from 'styled-components'

import { Wrapper, ICON_cog } from '../job'

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
