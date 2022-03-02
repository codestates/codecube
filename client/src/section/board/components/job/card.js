import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const JobCard = styled.a`
  background-color: #eeeeee;
  border-radius: 10px;
  height: 100px;
  padding: 1rem;
  text-decoration: none;
  color: inherit;

  cursor: pointer;
  transition: 0.4s;
  &:hover {
    transform: scale(102%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  &:first-child {
    margin-right: 1rem;
  }

  & > h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .info {
    font-size: 0.5rem;
    margin-bottom: 0.3rem;
  }

  flex: 1 0 0%;
`

const Card = ({ idx }) => {
  const { list } = useSelector((state) => state.jobReducer)
  const job = list[idx]
  return job ? (
    <JobCard
      href={job.EMPLMNT_INFO_URL}
      target="_blank"
      rel="noopener noreferer nofollow"
    >
      <h1>{list[idx].COMPNY_NM}</h1>
      <p className="info">{job.EMPLMNT_TITLE}</p>
      <p className="info">{job.WAGE_FORM + ' : ' + job.SALARY_INFO}</p>
      <p className="info">{job.WORK_REGION_LOC}</p>
    </JobCard>
  ) : (
    <JobCard
      style={{ backgroundColor: 'transparent', cursor: 'default', pointerEvents: 'none' }}
    />
  )
}

export default Card
