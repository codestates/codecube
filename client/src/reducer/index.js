import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import startReducer from './startReducer'
import projectsReducer from './projectsReducer'

export default combineReducers({ profileReducer, startReducer, projectsReducer })
