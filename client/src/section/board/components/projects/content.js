import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { getProjects } from '../../../../actions/projects'

import Project from './projectCard'

export const Container = styled.div`
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
  const { projects } = useSelector((state) => state.projectsReducer)

  return (
    <Container>
      <Wrapper>
        {projects.map((project, idx, projects) => {
          if (idx % 3 !== 0) return
          else
            return (
              <HiddenFloor key={v4()}>
                <Floor>
                  <Project idx={idx} />
                  <Project idx={idx + 1} />
                  <Project idx={idx + 2} />
                </Floor>
              </HiddenFloor>
            )
        })}
      </Wrapper>
      <Outlet />
    </Container>
  )
}

export default Content
