import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 } from 'uuid'

import styled from 'styled-components'

axios.defaults.withCredentials = true

const Content = styled.div`
  overflow: scroll;
  height: 50%;
  width: 100%;
`

const Anchor = styled.a`
  &:link,
  &:visited {
    color: rgb(66, 63, 59);
    text-decoration: none;
  }
`

const Card = styled.div`
  display: flex;
  background: hsl(0deg 0% 100%);
  box-shadow: 0 6px 12px -6px rgba(66, 63, 59, 0.3);
  padding: 0.5rem;
  width: 100%;
  height: 4rem;
  margin-bottom: 1.2rem;
  border-radius: 0.5rem;
  font-size: 0.1rem;
  justify-content: space-between;
  overflow: scroll;
`

const NoticeBoard = () => {
  const [jobListData, setJoblistData] = useState([{}])
  const getJobList = async () => {
    await axios
      .get(process.env.REACT_APP_API__URL + '/openapi/joblist', {
        withCredentials: true,
      })
      .then((res) => {
        setJoblistData(res.data)
      })
  }

  useEffect(() => {
    // getJobList()
  }, [])

  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>채용 공고</h1>
      <Content>
        {jobListData.map((v) => {
          return (
            <Anchor key={v4()} href={v.EMPLMNT_INFO_URL}>
              <Card>
                <div>{v.EMPLMNT_TITLE}</div>
                <div>{v.JOBCLASS_DIV_NM}</div>
                <div>마감일: {v.CLOS_DE_INFO}</div>
              </Card>
            </Anchor>
          )
        })}
      </Content>
    </>
  )
}

export default NoticeBoard
