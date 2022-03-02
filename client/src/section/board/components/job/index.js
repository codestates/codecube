import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { v4 } from 'uuid'
import styled from 'styled-components'

import { FaCog } from 'react-icons/fa'
import { getJobList } from '../../../../actions/job'
import Card from './card'

export const Wrapper = styled.div`
  height: 30vh;
  overflow: scroll;
  padding: 1rem;

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

const JobCardWrapper = styled.div`
  display: flex;
  height: 100px;
  margin-bottom: 1rem;
`

const Job = () => {
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.jobReducer)

  useEffect(() => {
    dispatch(getJobList())
  }, [])

  return (
    <Wrapper>
      {list.map((job, idx) => {
        return idx % 2 === 0 ? (
          <JobCardWrapper key={v4()}>
            <Card idx={idx}></Card>
            <Card idx={idx + 1}></Card>
          </JobCardWrapper>
        ) : null
      })}
    </Wrapper>
  )
}
export default Job
