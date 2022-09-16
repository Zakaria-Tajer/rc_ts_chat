import { configureStore } from "@reduxjs/toolkit";
import SwitchingHandler from "./slices/SwitchSlice";
import usersDataHandler from "./slices/DataSlice";
import chatDataHandler from "./slices/chatSlice";
import ReunionDateHander from "./slices/ReunionSlice";

export const store = configureStore({
  reducer: {
    switchHandler: SwitchingHandler,
    dataHandler: usersDataHandler,
    chatHandler: chatDataHandler,
    ReunionHandler: ReunionDateHander,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
