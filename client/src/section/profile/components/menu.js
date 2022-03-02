import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Switch from './switch'
import { Blind, Indicator } from './user'

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
  position: relative;

  width: 100%;
  height: 170px;
  border-radius: 20px;
  background-color: rgb(66, 63, 59);

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

const GrassBlind = styled(Blind)`
  background-color: rgba(155, 155, 155, 0.8);
  backdrop-filter: blur(4px);
`
const GrassIndicator = styled(Indicator)`
  &:before {
    content: '클릭';
  }
`

const Menu = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

  return (
    <Wrapper>
      <Switch />
      <Content>
        <GrassWrapper>
          <p>github contribution</p>
          <Grass src="https://ghchart.rshah.org/219138/codestate"></Grass>
          {isLoggedIn ? (
            <GrassBlind>
              <GrassIndicator>으로 깃허브 연동</GrassIndicator>
            </GrassBlind>
          ) : null}
        </GrassWrapper>
      </Content>
    </Wrapper>
  )
}

export default Menu
