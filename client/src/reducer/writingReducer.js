import { WRITING, POSTING } from '../actions/writing'

const initialState = {
  step: WRITING,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WRITING:
      return {
        ...state,
        step: WRITING,
      }
    case POSTING:
      return {
        ...state,
        step: POSTING,
      }
    default:
      return state
  }
}
