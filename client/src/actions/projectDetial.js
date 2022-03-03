import axios from 'axios'

export const PROJECT_DETAIL = 'PROJECT_DETAIL'

export const setProjectInfo = ({ title, content }) => {
  return {
    type: PROJECT_DETAIL,
    payload: { title, content },
  }
}

export const handleProjectDetail = (id) => async (dispatch) => {
  try {
    const {
      data: { projectInfo: project },
    } = await axios.get(`${process.env.REACT_APP_API__URL}/projects/${id}`)

    window.localStorage.setItem(PROJECT_DETAIL, JSON.stringify(project))
    dispatch(setProjectInfo(project))
  } catch (err) {
    console.log('게시글을 불러오지못했습니다.', err)
  }
}
