import { CHAT, MY_STATE } from '../actions/profile'

const initialState = {
  mode: MY_STATE,
  index: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_STATE:
      return {
        ...state,
        mode: MY_STATE,
        index: action.payload.index,
      }
    case CHAT:
      return {
        ...state,
        mode: CHAT,
        index: action.payload.index,
      }
    default:
      return state
  }
}
