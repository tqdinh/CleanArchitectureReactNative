import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckpointModel } from "models/CheckpointModel";
import { JourneyModel, JourneyStatus } from "models/JourneyModel";
import { TrekkingPhoto } from "models/PhotoModel";
import { RootState } from "redux/store";

export interface TrekkingState {
  currentJourney: JourneyModel;
  currentTrekkingCheckpoint: CheckpointModel;
  currentTrekkingPhoto: TrekkingPhoto | undefined;
  allJourneys: JourneyModel[];
}

const initialState: TrekkingState = {
  currentJourney: undefined,
  currentTrekkingCheckpoint: undefined,
  currentTrekkingPhoto: undefined,
  allJourneys: [],
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
    updateCurrentJourneyById(state, action: PayloadAction<number>) {
      if (state.allJourneys.length === 0) return;
      const id = action.payload;
      const currentJourney = state.allJourneys.find(
        (journey) => journey?._id === id
      );
      state.currentJourney = currentJourney;
    },
    updateAllJourneys(state, action: PayloadAction<JourneyModel[]>) {
      state.allJourneys = action.payload;
    },
    updateCurrentJourneyStatusById(
      state,
      action: PayloadAction<{ id: number; status: JourneyStatus | undefined }>
    ) {
      // update all journeys with corresponding id
      const updatedAllJourneys = state.allJourneys.map((journey) => {
        if (journey?._id === action.payload.id) {
          return { ...journey, status: action.payload.status }; // Update the name for id: 1
        }
        return journey; // Keep other items unchanged
      });
      state.allJourneys = updatedAllJourneys;

      // update current journey
      state.currentJourney = updatedAllJourneys.find(
        (journey) => journey?._id === action.payload.id
      );
    },
  },
});
export const { actions: trekkingActions, reducer: trekkingReducer } =
  trekkingSlice;
export const selectTrekking = (state: RootState) => state.trekking;
