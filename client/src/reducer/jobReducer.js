import { JOB_LIST } from '../actions/job'

const initialState = {
  list: [],
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_LIST:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

export default jobReducer
