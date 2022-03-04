import axios from 'axios'
import { getProjects } from './projects'
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_API__URL

export const WRITING_STEP = 'WRITING_STEP'
export const POSTING_STEP = 'POSTING_STEP'
export const AUTO_SAVING = 'AUTO_SAVING'
export const FINISH = 'FINISH'

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

const setInitial = () => {
  return {
    type: FINISH,
  }
}

export const handleFinish = (data) => (dispatch) => {
  axios
    .post(serverUrl + '/projects', data)
    .then((res) => dispatch(getProjects()))
    .catch((err) => console.log('게시글 작성실패: ', err))

  dispatch(setInitial())
}
