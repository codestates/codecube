import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleAutoSaving } from '../../../../actions/writing'

const Wrapper = styled.div`
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

const PreviewCard = () => {
  const autoSaver = useRef(null)
  const thumbnailRef = useRef(null)
  const [intro, setIntro] = useState('')
  const [image, setImage] = useState('') // 미리보기용 상태
  const { save } = useSelector((state) => state.writingReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    clearTimeout(autoSaver.current)
    autoSaver.current = null
    autoSaver.current = setTimeout(() => {
      dispatch(handleAutoSaving(save.title, save.content, intro, save.image))
    }, 500)

    return () => {
      clearTimeout(autoSaver.current)
    }
  }, [intro])

  const onUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setImage(img) // 이미지 미리보기

    dispatch(handleAutoSaving(save.title, save.content, save.intro, e.target.files[0]))
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default PreviewCard
