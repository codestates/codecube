import React from 'react'
import styled from 'styled-components'

const Contribution = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  max-height: inherit;
  justify-content: space-around;
`
const Grass = styled.img`
  width: 100%;
  height: 40%;
`

const GithubContribution = (props) => {
  return (
    <Contribution>
      <h1>Github contribution</h1>
      {props.gitContri ? (
        <Grass src={props.gitContri}></Grass>
      ) : (
        <Grass src="https://ghchart.rshah.org/219138/codestate"></Grass>
      )}
    </Contribution>
  )
}

export default GithubContribution
