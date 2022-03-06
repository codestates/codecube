import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { handleProjectDetail } from '../../../../actions/projectDetial'

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  border-radius: 15px;
  margin-right: 1.2rem;

  transition: 0.4s;
  overflow: hidden;

  &:hover {
    transform: translateY(-1.7%) scale(1.03);
  }

  flex: 1 0 0%;
`

const Thumbnail = styled.img`
  width: 100%;
  cursor: pointer;

  flex: 1 0 0%;
`

export const Intro = styled.div`
  /* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100&display=swap'); */
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  padding: 0.5rem 1rem;

  flex: 1 0 0%;
  overflow: visible;
  h1 {
    font-weight: bold;
    font-size: 1rem;
    margin: 0.6rem 0;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    font-size: 0.7rem;
    line-height: 1rem;
    color: gray;
  }
`

const Detail = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13%;
  background-color: white;
  font-size: 0.7rem;
  color: gray;

  cursor: pointer;
  transition: background-color 0.4s;
  &:hover {
    background-color: #0070bb;
    color: white;
  }
`

const Project = ({ idx }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { projects } = useSelector((state) => state.projectsReducer)
  const project = projects[idx]

  const onDetail = () => {
    dispatch(handleProjectDetail(project.projectId))
    navigate(`/project/${project.projectId}`)
  }

  return project ? (
    <Wrapper onClick={onDetail}>
      {/* DB의 SEED게시글은 image를 null로 보내줌*/}
      <Thumbnail src={project.image ?? require('../../../../dummy/뚱이.png')} />
      <Intro onClick={(e) => e.stopPropagation()}>
        <h1>{project.title}</h1>
        <p>{project.intro}</p>
      </Intro>
      <Detail>자세히 보기</Detail>
    </Wrapper>
  ) : (
    <Wrapper />
  )
}

export default Project
