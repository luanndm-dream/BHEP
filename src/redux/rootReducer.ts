import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import { appReducer } from './slice';
const rootReducer = combineReducers({
    user:userReducer,
    app: appReducer
  });
  
  export default rootReducer;
  