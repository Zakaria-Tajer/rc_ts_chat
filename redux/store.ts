import { configureStore } from "@reduxjs/toolkit";
import SwitchingHandler from './slices/SwitchSlice'
export const store = configureStore({
  reducer: {
    switchHandler: SwitchingHandler
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
