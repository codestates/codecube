import React from 'react'
import styled from 'styled-components'

import Switch from './switch'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 3 0 0%;
`
const Content = styled.div`
  background-color: #0070bb;
  border-radius: 20px;
  padding: 1rem;
  overflow: scroll;

  flex: 8 0 0%;
`

const GrassWrapper = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 20px;
  background-color: #164e22;
  padding: 1rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);

  p {
    color: white;
    margin-bottom: 1rem;
  }
`

const Grass = styled.img`
  width: 100%;
  height: 100px;
`

const Menu = () => {
  return (
    <Wrapper>
      <Switch />
      <Content>
        <GrassWrapper>
          <p>github contribution</p>
          <Grass src="https://ghchart.rshah.org/219138/codestate"></Grass>
        </GrassWrapper>
      </Content>
    </Wrapper>
  )
}

export default Menu
