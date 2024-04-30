import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import { appReducer } from './slice';
import userHealthRecordSlice from './slice/userHealthRecordSlice';
const rootReducer = combineReducers({
    user:userReducer,
    app: appReducer,
    userHealthRecord: userHealthRecordSlice
  });
  
  export default rootReducer;
  