// userSlice.ts
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
// import { RootState } from "redux/store";


const initialState = {
  //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdGFmZjFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3RhZmYiLCJleHAiOjE3NDAyMDM3MTksImlzcyI6ImJ1c2RlbGl2ZXJ5LWF1dGgtYXBpIiwiYXVkIjoiYnVzZGVsaXZlcnktY2xpZW50In0.lCo_zLaOpRLinbowy5z02ozSr9GBkwRcsEDcYhh7kPM",
  accessToken: undefined,
  refreshToken:  undefined,
  refreshTokenExpiryTime : undefined,
  userData: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenExpiryTime = action.payload.refreshTokenExpiryTime;
      state.userData = action.payload.user;
      
    },
    resetUserInfo: (state) => {
      // Reset all user info to initial state
      Object.assign(state, initialState);
    },
  },
});

// Corrected userType
type UserType = typeof userSlice.actions.setUserInfo;

export const {setUserInfo,resetUserInfo} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
