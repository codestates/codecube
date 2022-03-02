import axios from 'axios'

export const JOB_LIST = 'JOB_LIST'

const jobList = (data) => {
  return {
    type: JOB_LIST,
    payload: [...data],
  }
}

export const getJobList = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API__URL + '/openapi/joblist',
      {
        withCredentials: true,
      }
    )
    dispatch(jobList(data))
  } catch (err) {
    console.log('채용공고 불러오기 실패! ', err)
  }
}
