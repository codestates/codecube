import axios from 'axios'

// * types
export const IS_HOST = 'IS_HOST'
export const IS_NOT_HOST = 'IS_NOT_HOST'
export const MY_PROJECT = 'MY_PROJECT'

// * actions
export const handleSetIsHost = () => {
  return {
    type: IS_HOST,
  }
}
export const handleSetIsNotHost = () => {
  return {
    type: IS_NOT_HOST,
  }
}

const myProject = (data) => {
  return {
    type: MY_PROJECT,
    payload: {
      data,
    },
  }
}

export const getMyProject = () => async (dispatch) => {
  await axios
    .get(process.env.REACT_APP_API__URL + '/myProjects', {
      withCredentials: true,
    })
    .then(({ data }) => {
      dispatch(myProject(data))
      dispatch(handleSetIsHost())
    })
}
