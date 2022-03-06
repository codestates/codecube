import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { handleWriting, handleFinish, POSTING_STEP } from '../../../../actions/writing'
import styled from 'styled-components'
import { Button } from './writing'
import PreviewCard from './previewCard'

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
  background-color: #f8fbff;

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

const ButtonWrapper = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  height: 400px;

  flex: 1 0 0%;
`

const Posting = ({ setAlert }) => {
  const ref = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { step, save } = useSelector((state) => state.writingReducer)
  const { isLoggedIn } = useSelector((state) => state.loginReducer)

  // posting단계에서 UI라우팅만으로 다른페이지에 다녀온 후 글쓰기 시 writing단계를 무시하고 바로 posting단계로 넘어감을 방지하기위한 코드입니다.
  // 예를 들어, 이부분을 지우고 로그인하지않을 채로 posting단계까지 진입후 '완료'버튼을 누르고 로그인화면에서 로그인 후 다시 글쓰기 하면 바로 posting 단계가 나옵니다.
  useEffect(() => {
    return () => {
      dispatch(handleWriting())
    }
  }, [])

  const onPrev = () => {
    ref.current.classList.add('disappear')
    setTimeout(() => {
      dispatch(handleWriting())
    }, 300)
  }

  const onFinish = () => {
    if (isLoggedIn) {
      dispatch(handleFinish(save))
      navigate('/')
    } else {
      setAlert(true)
    }
  }

  return step === POSTING_STEP ? (
    <Wrapper ref={ref}>
      <PreviewCard />
      <ButtonWrapper>
        <Button
          style={{ marginBottom: '1rem' }}
          className="exit"
          value="이전"
          onClick={onPrev}
        />
        <Button className="next" value="완료" onClick={onFinish} />
      </ButtonWrapper>
    </Wrapper>
  ) : null
}

export default Posting
