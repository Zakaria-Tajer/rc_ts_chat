import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StackSwitching } from "../../interfaces/Switch";

export const initialState: StackSwitching = {
  switchForm: false,
  users: false
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
    },
  },
});

export const { AuthSwitch,StackSwitch } = switchSlice.actions;
export default switchSlice.reducer;
