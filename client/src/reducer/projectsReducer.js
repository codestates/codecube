import { PROJECTS, STEP_ONE, STEP_TWO } from '../actions/projects'

const initialState = {
  step: STEP_ONE,
  projects: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case PROJECTS:
    //   return {
    //     ...state,
    //     projects: action.payload.projects,
    //   }
    case STEP_ONE:
      return {
        ...state,
        step: action.step,
        projects: action.payload.projects,
      }
    case STEP_TWO:
      return {
        ...state,
        step: action.step,
      }
    default:
      return state
  }
}
