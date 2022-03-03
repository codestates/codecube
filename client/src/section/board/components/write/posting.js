import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleWriting, POSTING } from '../../../../actions/writing'
import styled from 'styled-components'
import { Thumbnail, Spoiler } from '../projects/projectCard'
import { Button } from './writing'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: rgba(248, 249, 250);

  @keyframes appear-posting {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  animation: appear-posting ease-out 0.2s;

  @keyframes disappear-posting {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  &.disappear {
    animation: disappear-posting ease-out 0.2s;
    animation-fill-mode: forwards;
  }
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 450px;
  border-radius: 15px;
  margin-right: 1%;

  flex: 4 0 0%;
`

const Card = styled.div`
  width: 350px;
  height: 450px;
  border-radius: 15px;
  background-color: lightgray;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
`

const ButtonWrapper = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  height: 400px;

  flex: 1 0 0%;
`

const Posting = () => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const { step } = useSelector((state) => state.writingReducer)

  const onPrev = () => {
    ref.current.classList.add('disappear')
    setTimeout(() => {
      dispatch(handleWriting())
    }, 300)
  }

  return step === POSTING ? (
    <Wrapper ref={ref}>
      <CardWrapper>
        <Card></Card>
      </CardWrapper>
      <ButtonWrapper>
        <Button
          style={{ marginBottom: '1rem' }}
          className="exit"
          value="이전"
          onClick={onPrev}
        />
        <Button className="next" value="완료" />
      </ButtonWrapper>
    </Wrapper>
  ) : null
}

export default Posting
