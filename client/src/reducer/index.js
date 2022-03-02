import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import projectsReducer from './projectsReducer'
import loginReducer from './loginReducer'

export default combineReducers({ profileReducer, projectsReducer, loginReducer })
