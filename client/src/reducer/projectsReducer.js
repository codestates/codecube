import { PROJECTS } from '../actions/projects'

const initialState = {
  projects: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      }
    default:
      return state
  }
}
