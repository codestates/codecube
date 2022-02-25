import React from 'react'
import styled from 'styled-components'

import { FaCog } from 'react-icons/fa'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 12 0 0%;
`

export const ICON_cog = styled(FaCog)`
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
  animation: spin 3s linear infinite;
`

const Job = () => {
  return (
    <Wrapper>
      <ICON_cog />
    </Wrapper>
  )
}
export default Job
