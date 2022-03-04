import { WRITING_STEP, POSTING_STEP, AUTO_SAVING } from '../actions/writing'

const initialState = {
  step: WRITING_STEP,
  save: {
    title: '',
    content: '',
    intro: '',
    image: '',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WRITING_STEP:
      return {
        ...state,
        step: WRITING_STEP,
      }
    case POSTING_STEP:
      return {
        ...state,
        step: POSTING_STEP,
      }
    case AUTO_SAVING:
      return {
        ...state,
        save: {
          title: action.payload.title,
          content: action.payload.content,
          intro: action.payload.intro,
          image: action.payload.image,
        },
      }
    default:
      return state
  }
}
