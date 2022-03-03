import { PROJECT_DETAIL } from '../actions/projectDetial'

const projectDetailLoc = window.localStorage.getItem(PROJECT_DETAIL)
const projectDetail = projectDetailLoc ? JSON.parse(projectDetailLoc) : null
console.log(projectDetail)

const initialState = {
  title: projectDetail ? projectDetail.title : '',
  content: projectDetail ? projectDetail.content : '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_DETAIL:
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content,
      }
    default:
      return state
  }
}
