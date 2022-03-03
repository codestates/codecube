export const WRITING = 'WRITING'
export const POSTING = 'POSTING'
export const AUTO_SAVING = 'AUTO_SAVING'

export const handleWriting = () => {
  return {
    type: WRITING,
  }
}

export const handlePosting = () => {
  return {
    type: POSTING,
  }
}

export const handleAutoSaving = (title, content) => {
  return {
    type: AUTO_SAVING,
    payload: {
      title,
      content,
    },
  }
}
