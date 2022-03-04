import axios from 'axios'

export const PROJECTS = 'PROJECTS'

const projects = (projects) => {
  return {
    type: PROJECTS,
    payload: {
      projects,
    },
  }
}

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API__URL + '/projects')
    dispatch(projects(data.list))
  } catch (err) {
    console.log('공개게시판 불러오는 과정에서 발생한 오류입니다.', err)
  }
}
