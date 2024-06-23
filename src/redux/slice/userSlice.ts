// userSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Platform } from "react-native";
// import { RootState } from "redux/store";

const initialState = {
   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdGFmZjFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3RhZmYiLCJleHAiOjE3NDAyMDM3MTksImlzcyI6ImJ1c2RlbGl2ZXJ5LWF1dGgtYXBpIiwiYXVkIjoiYnVzZGVsaXZlcnktY2xpZW50In0.lCo_zLaOpRLinbowy5z02ozSr9GBkwRcsEDcYhh7kPM",
  // accessToken: undefined,
  refreshToken: undefined,
  refreshTokenExpiryTime: undefined,
  userData: {
      id: 5,
      roleId: Platform.OS === 'android'? 2 : 3,
      geoLocationId: undefined,
      fullName: 'David Phú',
      email: undefined,
      identify: undefined,
      phoneNumber: undefined,
      gender: undefined,
      description: undefined,
      avatar:undefined,
      isActive: undefined
  },
  isSplash: true

  // userDataFake: {
  //   id: 1,
  //   roleId: 3,
  //   geoLocationId: 1,
  //   fullName: "Thanh Huyền",
  //   email: "admin@gmail.com",
  //   identify: "1234567890",
  //   phoneNumber: "0784689531",
  //   gender: 1,
  //   description: "Bác sĩ chuyên khoa 2",
  //   avatar:
 
  //   isActive: true,
  // },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenExpiryTime = action.payload.refreshTokenExpiryTime;
      state.userData = action.payload.user;
    },
    setUserIsSplash : (state, action: PayloadAction<any>)=>{
      state.isSplash = action.payload
    },
    resetUserInfo: (state) => {
      // Reset all user info to initial state
      Object.assign(state, initialState);
    },
  },
});

// Corrected userType
type UserType = typeof userSlice.actions.setUserInfo;

export const { setUserInfo, resetUserInfo, setUserIsSplash } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
