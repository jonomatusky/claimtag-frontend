import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import projectsReducer from './projectSlice'
import alertReducer from './alertSlice'

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  alert: alertReducer,
})

export default rootReducer
