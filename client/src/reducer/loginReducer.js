import { LOGGED_OUT, LOGGED_IN } from '../actions/login'

const userInfo = window.localStorage.getItem('userInfo')
const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null

const initialState = {
  isLoggedIn: userInfo ? true : false,
  description: userInfo ? parsedUserInfo.description : '',
  email: userInfo ? parsedUserInfo.email : '',
  id: userInfo ? parsedUserInfo.id : '',
  oauth: userInfo ? parsedUserInfo.oauth : '',
  username: userInfo ? parsedUserInfo.username : '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        description: action.payload.description,
        email: action.payload.email,
        id: action.payload.id,
        oauth: action.payload.oauth,
        username: action.payload.username,
      }
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        description: action.payload.description,
        email: action.payload.email,
        id: action.payload.id,
        oauth: action.payload.oauth,
        username: action.payload.username,
      }
    default:
      return state
  }
}
