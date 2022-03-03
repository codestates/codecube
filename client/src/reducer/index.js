import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import projectsReducer from './projectsReducer'
import loginReducer from './loginReducer'
import jobReducer from './jobReducer'
import writingReducer from './writingReducer'
import projectDetailReducer from './projectDetailReducer'

export default combineReducers({
  profileReducer,
  projectsReducer,
  loginReducer,
  jobReducer,
  writingReducer,
  projectDetailReducer,
})
