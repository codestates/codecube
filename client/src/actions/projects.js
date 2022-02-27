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

export const getProjects = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_API__URL + '/projects')
    .then(({ data }) => dispatch(projects(data.list)))
    .catch((e) => console.log('공개게시판 불러오는 과정에서 발생한 오류입니다.', e))
}
