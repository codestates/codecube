import axios from 'axios'

export const PROJECTS = 'PROJECTS'

// test
export const STEP_ONE = 'STEP_ONE'
export const STEP_TWO = 'STEP_TWO'
const stepOne = (projects) => {
  return {
    type: STEP_ONE,
    step: STEP_ONE,
    payload: {
      projects,
    },
  }
}
const stepTwo = () => {
  return {
    type: STEP_TWO,
    step: STEP_TWO,
  }
}
// test

// const projects = (projects) => {
//   return {
//     type: PROJECTS,
//     payload: {
//       projects,
//     },
//   }
// }

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API__URL + '/projects')
    dispatch(stepOne(data.list))
    dispatch(stepTwo())
  } catch (err) {
    console.log('공개게시판 불러오는 과정에서 발생한 오류입니다.', err)
  }
}
