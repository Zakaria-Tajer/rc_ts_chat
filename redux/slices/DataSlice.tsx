import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllUsersData } from "../../interfaces/Data";

export const initialState: AllUsersData = {
  users: [],
  currentUser: '',
  pressedUser: [],
};

export const switchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<AllUsersData>) => {
      state.users = action.payload.users;
      state.currentUser = action.payload.currentUser;
    },
    getPressedUsers: (state, action: PayloadAction<AllUsersData>) => {
      state.pressedUser = action.payload.pressedUser;
    }

  },
});

export const { setUsersData,getPressedUsers } = switchSlice.actions;
export default switchSlice.reducer;
