export const WRITING_STEP = 'WRITING_STEP'
export const POSTING_STEP = 'POSTING_STEP'
export const AUTO_SAVING = 'AUTO_SAVING'

export const handleWriting = () => {
  return {
    type: WRITING_STEP,
  }
}

export const handlePosting = () => {
  return {
    type: POSTING_STEP,
  }
}

export const handleAutoSaving = (title, content, intro, image) => {
  return {
    type: AUTO_SAVING,
    payload: {
      title,
      content,
      intro,
      image,
    },
  }
}
