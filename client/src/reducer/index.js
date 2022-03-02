import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import projectsReducer from './projectsReducer'
import loginReducer from './loginReducer'
import jobReducer from './jobReducer'

export default combineReducers({
  profileReducer,
  projectsReducer,
  loginReducer,
  jobReducer,
})
