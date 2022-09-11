import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllUsersData, listOfData } from "../../interfaces/Data";

export const initialState: listOfData = {
  users: [],
  currentUser: '',
  pressedUser: [],
  pressedUserEmail: '',
  currentUserId: '',
  fileMimeType: '',
  AudioId: ''
};

export const switchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<listOfData>) => {
      state.users = action.payload.users;
      state.currentUser = action.payload.currentUser;
      state.currentUserId = action.payload.currentUserId;
    },
    getPressedUsers: (state, action: PayloadAction<listOfData>) => {
      state.pressedUser = action.payload.pressedUser;
      state.pressedUserEmail = action.payload.pressedUserEmail;

    },
    uploadedFilesData: (state, action: PayloadAction<listOfData>) => {
      state.fileMimeType = action.payload.fileMimeType;
      state.AudioId = action.payload.AudioId;
    }

  },
});

export const { setUsersData,getPressedUsers,uploadedFilesData } = switchSlice.actions;
export default switchSlice.reducer;
