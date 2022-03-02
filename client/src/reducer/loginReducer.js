import { LOGGED_OUT, LOGGED_IN } from '../actions/login'

const initialState = {
  isLoggedIn: window.localStorage.getItem('userInfo') ? true : false,
  // isLoggedIn: window.sessionStorage.getItem('userInfo') ? true : false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      }
    default:
      return state
  }
}
