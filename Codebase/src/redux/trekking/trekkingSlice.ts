import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TrekkingCheckpoint } from "models/CheckpointModel";
import { TrekkingJourney } from "models/JourneyModel";
import { TrekkingPhoto } from "models/PhotoModel";
import { RootState } from "redux/store";

export interface TrekkingState {
  currentTrekkingJourney: TrekkingJourney | undefined;
  currentTrekkingCheckpoint: TrekkingCheckpoint | undefined;
  currentTrekkingPhoto: TrekkingPhoto | undefined;
}

const initialState: TrekkingState = {
  currentTrekkingJourney: undefined,
  currentTrekkingCheckpoint: undefined,
  currentTrekkingPhoto: undefined,
};

const trekkingSlice = createSlice({
  name: "TrekkingSlice",
  initialState,
  reducers: {
    updateCurrentTrekkingPhoto(
      state,
      action: PayloadAction<TrekkingPhoto | undefined>
    ) {
      state.currentTrekkingPhoto = action.payload;
    },
    updateCurrentTrekkingJourney(
      state,
      action: PayloadAction<TrekkingJourney | undefined>
    ) {
      state.currentTrekkingJourney = action.payload;
    },
    
  },
});
export const { actions: trekkingActions, reducer: trekkingReducer } =
  trekkingSlice;
export const selectTrekking = (state: RootState) => state.trekking;
