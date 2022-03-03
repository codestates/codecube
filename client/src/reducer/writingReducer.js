import { WRITING, POSTING, AUTO_SAVING } from '../actions/writing'

const initialState = {
  step: WRITING,
  save: {
    title: '',
    content: '',
  },
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
    case AUTO_SAVING:
      return {
        ...state,
        save: {
          title: action.payload.title,
          content: action.payload.content,
        },
      }
    default:
      return state
  }
}
