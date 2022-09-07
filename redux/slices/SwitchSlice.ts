import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatUsersDetailsFirestore } from "../../interfaces/Data";
import { StackSwitching } from "../../interfaces/Switch";

export const initialState: StackSwitching = {
  switchForm: false,
  users: false,
  VerificationScreen: false,
  verificationCode: "",

};

export const switchSlice = createSlice({
  name: "switch",
  initialState,
  reducers: {
    AuthSwitch: (state, action: PayloadAction<StackSwitching>) => {
      state.switchForm = action.payload.switchForm;
    },
    StackSwitch: (state, action: PayloadAction<StackSwitching>) => {
      state.users = action.payload.users;
      state.VerificationScreen = action.payload.VerificationScreen;
      state.verificationCode = action.payload.verificationCode;
    },
  },
});

export const { AuthSwitch, StackSwitch } = switchSlice.actions;
export default switchSlice.reducer;
