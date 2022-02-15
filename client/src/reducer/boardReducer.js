import { IS_HOST, IS_NOT_HOST, MY_PROJECT } from '../actions/board'

const initialState = {
  isHost: false,
  myProject: {
    host: {
      projectId: '',
      title: '',
      confirmed: '',
      recruitment: '',
      content: '',
      start: 0,
      done: 0,
    },
    guest: {
      confirmed: {
        projectId: '',
        title: '',
        confirmed: '',
        recruitment: '',
        content: '',
        start: 0,
        done: 0,
      },
      wishList: [{}],
    },
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_HOST:
      return {
        ...state,
        isHost: true,
      }
    case IS_NOT_HOST:
      return {
        ...state,
        isHost: false,
      }
    case MY_PROJECT:
      return {
        ...state,
        myProject: action.payload.data,
      }
    default:
      return state
  }
}
