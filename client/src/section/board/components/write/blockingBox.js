import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({ role: 'dialog' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  width: 50%;
  height: 30%;
  max-width: 400px;
  max-height: 200px;
  min-width: 300px;
  min-height: 150px;
  background-color: rgb(248, 249, 250);
  border-radius: 5px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;

  @keyframes appear-blocking-box {
    from {
      top: 70%;
      transform: scale(0%) translate(-50%, -50%);
    }
    to {
      top: 50%;
      transform: scale(100%) translate(-50%, -50%);
    }
  }
  animation: appear-blocking-box 0.3s;
`

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1 0 0;
`

const ButtonWrapper = styled(MessageWrapper)`
  justify-content: space-around;
`

const Button = styled.input.attrs({ type: 'button' })`
  background-color: white;
  border: none;
  border-radius: 5px;
  width: 40%;
  height: 60%;
  font-weight: bold;
  font-size: 1rem;

  cursor: pointer;
  transition: 0.4s;
  &:hover {
    &.let-login {
      transform: scale(103%);
      box-shadow: 0 0px 6px #00b0ff;
    }
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.2);
  }
  &.let-login {
    background-color: #00b0ff;
    color: white;
  }
`

const BlockingBox = ({ alert, setAlert }) => {
  const navigate = useNavigate()

  const onClose = () => {
    setAlert(false)
  }

  const onLogin = () => {
    navigate('/login')
  }

  return alert ? (
    <Wrapper>
      <MessageWrapper>
        <p>로그인 하지않으면 게시글이 저장되지 않아요!</p>
      </MessageWrapper>
      <ButtonWrapper>
        <Button value="다음에 할게요" className="ignore" onClick={onClose} />
        <Button value="로그인 하기" className="let-login" onClick={onLogin} />
      </ButtonWrapper>
    </Wrapper>
  ) : null
}

export default BlockingBox
