import { configureStore } from "@reduxjs/toolkit";
import SwitchingHandler from "./slices/SwitchSlice";
import usersDataHandler from "./slices/DataSlice";
import chatDataHandler from "./slices/chatSlice";


export const store = configureStore({
  reducer: {
    switchHandler: SwitchingHandler,
    dataHandler: usersDataHandler,
    chatHandler: chatDataHandler,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
