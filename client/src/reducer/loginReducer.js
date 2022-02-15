import { LOGIN, LOGOUT, SIGNUP_PAGE_ON, SIGNUP_PAGE_OFF } from '../actions'

const initialState = {
  isLoggedIn: window.localStorage.getItem('userinfo'),
  isSignUp: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    case SIGNUP_PAGE_ON:
      return {
        ...state,
        isSignUp: true,
      }
    case SIGNUP_PAGE_OFF:
      return {
        ...state,
        isSignUp: false,
      }
    default:
      return state
  }
}
