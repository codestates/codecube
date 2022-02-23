import React from 'react'
import styled from 'styled-components'
import Bar from './bar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 12 0 0%;
`

const Content = styled.div`
  flex: 12 0 0%;
  border: 1px black solid;
  border-top: none;
`

const Public = () => {
  return (
    <Wrapper>
      <Bar />
      <Content />
    </Wrapper>
  )
}

export default Public
