import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import startReducer from './startReducer'

export default combineReducers({ profileReducer, startReducer })
