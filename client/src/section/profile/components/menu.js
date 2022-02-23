import React from 'react'
import styled from 'styled-components'

import Switch from './switch'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 3 0 0%;
`
const Content = styled.div`
  background-color: #1458a4;
  border-radius: 10px;
  flex: 8 0 0%;
`

const Menu = () => {
  return (
    <Wrapper>
      <Switch />
      <Content />
    </Wrapper>
  )
}

export default Menu
