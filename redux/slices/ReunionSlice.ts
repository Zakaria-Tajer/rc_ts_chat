import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReuinionData } from "../../interfaces/Reunion";

export const initialState: ReuinionData = {
  ReunionTitle: '', 
  ReunionPasswordTrue: false,
  ReunionPassword: '',
  ReunionDateTrue: false,
  ReunionDate: '',
  ReunionTime: '',
  WaitingRoome: false,
  micIsDisabled: false,
  cameraIsDisabled: false,
  blockAllMics: false,
  blockScreenSharing: false,
  blockVideo: false,
  blockConversations: false,
};

export const switchSlice = createSlice({
  name: "reunion",
  initialState,
  reducers: {
    setReuinonAccess: (state, action: PayloadAction<ReuinionData>) => {
      state.ReunionTitle = action.payload.ReunionTitle;
      state.ReunionPasswordTrue = action.payload.ReunionPasswordTrue;
      state.ReunionPassword = action.payload.ReunionPassword;
    },
    setReuinonDate: (state, action: PayloadAction<ReuinionData>) => {
      state.ReunionDateTrue = action.payload.ReunionDateTrue;
      state.ReunionDate = action.payload.ReunionDate;
      state.ReunionTime = action.payload.ReunionTime;
    },
    setReuinonStarter: (state, action: PayloadAction<ReuinionData>) => {
      state.WaitingRoome = action.payload.WaitingRoome;
      state.micIsDisabled = action.payload.micIsDisabled;
      state.cameraIsDisabled = action.payload.cameraIsDisabled
    },
    setReuinonRestrictions: (state, action: PayloadAction<ReuinionData>) => {
      state.blockAllMics = action.payload.blockAllMics;
      state.blockScreenSharing = action.payload.blockScreenSharing;
      state.blockVideo = action.payload.blockVideo
      state.blockConversations = action.payload.blockConversations
    },

  },
});

export const { setReuinonAccess, setReuinonDate, setReuinonStarter, setReuinonRestrictions } =
  switchSlice.actions;
export default switchSlice.reducer;
