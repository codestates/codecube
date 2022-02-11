import React, { useRef, useCallback } from 'react'

const PostContent = ({ thisPost }) => {
  const { title, content } = thisPost

  const contentWrapper = useRef()
  const buttonBackdrop = useRef()
  const showAllButton = useRef()

  const showAll = useCallback(() => {
    contentWrapper.current.classList.remove('limit')
    buttonBackdrop.current.classList.add('hidden')
    showAllButton.current.classList.add('hidden')
  }, [])

  return (
    <div ref={contentWrapper} className="content-wrapper limit">
      <h1>{title}</h1>
      <div className="content">{content}</div>
      <div ref={buttonBackdrop} className="button-backdrop">
        <button ref={showAllButton} className="show-all" onClick={showAll}>
          모두보기
        </button>
      </div>
    </div>
  )
}

export default PostContent
