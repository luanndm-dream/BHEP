import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    record: []
}

const userHealthRecordSlice = createSlice({
    name: "userHealthRecord",
    initialState,
    reducers: {
        setUserHealthRecord: (state, action: PayloadAction<any>) => {
            state.record = action.payload
        }
    }
})


type UserType = typeof userHealthRecordSlice.actions.setUserHealthRecord;

export const { setUserHealthRecord } = userHealthRecordSlice.actions;
export const userSelector = (state: RootState) => state.userHealthRecord;
export default userHealthRecordSlice.reducer;