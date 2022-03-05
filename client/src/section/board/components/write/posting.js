import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleWriting,
  handleFinish,
  handleAutoSaving,
  POSTING_STEP,
} from '../../../../actions/writing'
import axios from 'axios'
import styled from 'styled-components'
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

const CardWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  padding-bottom: 60%;
  margin-right: 1%;

  flex: 4 0 0%;
`

const Card = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const ThumbnailWrapper = styled.div`
  position: relative;

  padding-top: 70%;
  &:hover {
    .clicktoupload {
      background-color: #d9d9d9;
    }
    .clicktoupload p:before {
      color: #00b0ff;
    }
  }
`

const ClickToUpload = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;

  display: ${(props) => (props.image === '' ? 'flex' : 'none')};
  background-color: #d1d1d1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;

  transition: 0.4s;
  p:before {
    transition: 0.4s;
    content: '클릭';
  }
`

const Thumbnail = styled.img`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;

  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.src === '' ? '0' : '1')};
`

const Uploader = styled.input.attrs({ type: 'file' })`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const Intro = styled.textarea.attrs({
  placeholder: '간단한 한줄 소개 또는 전하고싶은말을 적어주세요(최대 80자)',
  maxLength: '80',
})`
  resize: none;
  margin: 1rem;
  padding: 1rem;
  border: none;
  outline: none;

  flex: 1 0 0%;
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
  const thumbnailRef = useRef(null)
  const autoSaver = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { step, save } = useSelector((state) => state.writingReducer)

  const [image, setImage] = useState('') // 미리보기용 상태
  const [imageData, setImageData] = useState('') // 서버 전송용 상태
  const [intro, setIntro] = useState('')

  useEffect(() => {
    clearTimeout(autoSaver.current)
    autoSaver.current = null

    autoSaver.current = setTimeout(() => {
      dispatch(handleAutoSaving(save.title, save.content, intro, imageData))
    }, 500)

    return () => {
      clearTimeout(autoSaver.current)
    }
  }, [intro, imageData])

  const onPrev = () => {
    ref.current.classList.add('disappear')
    setTimeout(() => {
      dispatch(handleWriting())
    }, 300)
  }

  const onUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setImage(img) // 이미지 미리보기

    setImageData(e.target.files[0])
    dispatch(handleAutoSaving(save.title, save.content, intro, e.target.files[0]))
  }

  const onFinish = () => {
    dispatch(handleFinish(save))
    navigate('/')
  }

  return step === POSTING_STEP ? (
    <Wrapper ref={ref}>
      <CardWrapper>
        <Card>
          <ThumbnailWrapper>
            <ClickToUpload className="clicktoupload" image={image}>
              <p>으로 썸네일 업로드</p>
            </ClickToUpload>
            <Uploader accept="image/*" type="file" onChange={onUpload}></Uploader>
            <Thumbnail src={image} ref={thumbnailRef}></Thumbnail>
          </ThumbnailWrapper>
          <Intro onChange={(e) => setIntro(e.target.value)}></Intro>
        </Card>
      </CardWrapper>
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
