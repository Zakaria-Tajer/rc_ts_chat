import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllUsersData } from "../../interfaces/Data";

export const initialState: AllUsersData = {
  users: []
};

export const switchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<AllUsersData>) => {
      state.users = action.payload.users;
    },
   
  },
});

export const { setUsersData } = switchSlice.actions;
export default switchSlice.reducer;
