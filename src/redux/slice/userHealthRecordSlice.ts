import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    record: [],
    isChecking: false
}

const userHealthRecordSlice = createSlice({
    name: "userHealthRecord",
    initialState,
    reducers: {
        setUserHealthRecord: (state, action: PayloadAction<any>) => {
            state.record = action.payload
        },
        setUserChecking : (state, action :PayloadAction<boolean>) =>{
            state.isChecking = action.payload
        }
    }
})


type UserType = typeof userHealthRecordSlice.actions.setUserHealthRecord;

export const { setUserHealthRecord, setUserChecking } = userHealthRecordSlice.actions;
export const userSelector = (state: RootState) => state.userHealthRecord;
export default userHealthRecordSlice.reducer;