import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckpointModel } from "models/CheckpointModel";
import { JourneyModel } from "models/JourneyModel";
import { TrekkingPhoto } from "models/PhotoModel";
import { RootState } from "redux/store";

export interface TrekkingState {
  currentTrekkingJourney: JourneyModel;
  currentTrekkingCheckpoint: CheckpointModel;
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
      action: PayloadAction<JourneyModel>
    ) {
      state.currentTrekkingJourney = action.payload;
    },
    
  },
});
export const { actions: trekkingActions, reducer: trekkingReducer } =
  trekkingSlice;
export const selectTrekking = (state: RootState) => state.trekking;
