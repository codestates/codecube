import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;

  flex: 1 0 0%;
`

const Form = styled.form`
  position: relative;

  height: 70%;
  width: 30%;

  &:focus-within {
    input {
      width: 100%;
      border: 1px solid #00b0ff;
      cursor: text;
    }
    svg {
      color: #00b0ff;
      font-size: 1.1rem;
    }
  }
`
const SearchBar = styled.input`
  height: 100%;
  width: 30px;

  transition: 0.3s;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;

  padding-left: 1.6rem;
  cursor: pointer;

  &:hover {
    border: 1px solid #00b0ff;
  }
`

const ICON_search = styled(MdSearch)`
  position: absolute;
  top: 50%;
  left: 15px;

  color: lightgray;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: 0.3s;
`

const Bar = () => {
  return (
    <>
      <Wrapper>
        <Form>
          <SearchBar />
          <ICON_search />
        </Form>
      </Wrapper>
    </>
  )
}

export default Bar
