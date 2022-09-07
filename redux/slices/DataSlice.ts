import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllUsersData } from "../../interfaces/Data";

export const initialState: AllUsersData = {
  users: [],
  currentUser: '',
  pressedUser: [],
  pressedUserEmail: '',
  currentUserId: ''
};

export const switchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<AllUsersData>) => {
      state.users = action.payload.users;
      state.currentUser = action.payload.currentUser;
      state.currentUserId = action.payload.currentUserId;
    },
    getPressedUsers: (state, action: PayloadAction<AllUsersData>) => {
      state.pressedUser = action.payload.pressedUser;
      state.pressedUserEmail = action.payload.pressedUserEmail;

    }

  },
});

export const { setUsersData,getPressedUsers } = switchSlice.actions;
export default switchSlice.reducer;
