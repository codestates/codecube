import { LANDING_PAGE, MAIN_PAGE } from '../actions/start'

const initialState = {
  isLanding: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LANDING_PAGE:
      return {
        ...state,
        isLanding: true,
      }
    case MAIN_PAGE:
      return {
        ...state,
        isLanding: false,
      }
    default:
      return state
  }
}
