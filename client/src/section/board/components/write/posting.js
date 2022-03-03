import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleWriting, POSTING } from '../../../../actions/writing'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(248, 249, 250);

  @keyframes appear {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  animation: appear ease-out 0.2s;

  @keyframes disappear {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  &.disappear {
    animation: disappear ease-out 0.2s;
    animation-fill-mode: forwards;
  }
`

const Posting = () => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const { step } = useSelector((state) => state.writingReducer)

  const onPrev = () => {
    ref.current.classList.add('disappear')
    setTimeout(() => {
      dispatch(handleWriting())
    }, 200)
  }

  return step === POSTING ? (
    <Wrapper ref={ref}>
      <input type="button" value="button" onClick={onPrev}></input>
    </Wrapper>
  ) : null
}

export default Posting
