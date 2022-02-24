import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'

import Post from './post'

const Container = styled.div`
  height: 30vh;
  overflow: scroll;

  flex: 12 0 0%;
  padding: 1rem 0;
`
const Wrapper = styled.div`
  height: 0px;
  overflow: visibility;
`

const HiddenFloor = styled.div`
  position: relative;

  padding-bottom: 47%;
  margin-bottom: 2rem;
`

const Floor = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  & :last-child {
    margin-right: 0;
  }
`

const Content = () => {
  const [dummyList, _] = useState([0, 0, 0])

  return (
    <Container>
      <Wrapper>
        {/* --- dummy --- */}
        {dummyList.map((v) => {
          return (
            <HiddenFloor key={v4()}>
              <Floor>
                <Post />
                <Post />
                <Post />
              </Floor>
            </HiddenFloor>
          )
        })}
        {/* --- dummy --- */}
      </Wrapper>
    </Container>
  )
}

export default Content
