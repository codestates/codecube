import { LANDING_PAGE, MAIN_PAGE } from '../actions/start'

const initialState = {
  isLoggedIn: window.localStorage.getItem('login'),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LANDING_PAGE:
      return {
        ...state,
        isLoggedIn: false,
      }
    case MAIN_PAGE:
      return {
        ...state,
        isLoggedIn: true,
      }
    default:
      return state
  }
}
