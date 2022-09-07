import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatDetails } from "../../interfaces/Data";

export const initialState: ChatDetails = {
  chatId: "",
  chatUsers: [],
  messagesArray: [],
};

export const switchSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getUserChatDetails: (state, action: PayloadAction<ChatDetails>) => {
      state.chatId = action.payload.chatId;
      state.chatUsers = action.payload.chatUsers;
    },
    getChatDetails: (
      state,
      action: PayloadAction<ChatDetails>
    ) => {
      state.messagesArray = action.payload.messagesArray
    },
  },
});

export const { getUserChatDetails, getChatDetails } = switchSlice.actions;
export default switchSlice.reducer;
