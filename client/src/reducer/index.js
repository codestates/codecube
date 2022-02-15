import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import boardReducer from './boardReducer'

export default combineReducers({ loginReducer, boardReducer })
