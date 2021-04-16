import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  rings: [] as http.IRingsItemResponse[],
  singleRing: null as null | http.IRingsItemResponse,
  ringsLoading: false,

  updateByManagerLoading: false,
  updateByManagerFinished: false,

  newRingSubmitting: false,
  newRingSubmitted: false,
};

// thunk actions
export const getAllRings = createAsyncThunk("rings/rings", http.getAllRings);
export const createNewRing = createAsyncThunk("rings/create", http.createNewRing);
export const updateRingByManager = createAsyncThunk("rings/updateByManager", http.updateRingByManager);

export const ringsSlice = createSlice({
  name: "rings",
  initialState,
  reducers: {
    setSingleRing(state, action) {
      state.singleRing = action.payload;
    },
    clearSingleRing(state) {
      state.singleRing = null;
    },
    setNewRingSubmitted(state, action) {
      state.newRingSubmitted = action.payload;
    },
    setUpdateByManagerFinished(state, action) {
      state.updateByManagerFinished = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // getting all rings
      .addCase(getAllRings.pending, (state, action) => {
        state.ringsLoading = true;
      })
      .addCase(getAllRings.fulfilled, (state, action) => {
        state.rings = action.payload;
        state.ringsLoading = false;
      })
      .addCase(getAllRings.rejected, (state, action) => {
        state.ringsLoading = false;
      })

      // create new ring
      .addCase(createNewRing.pending, (state, action) => {
        state.newRingSubmitting = true;
      })
      .addCase(createNewRing.fulfilled, (state, action) => {
        state.newRingSubmitted = true;
        state.newRingSubmitting = false;
      })
      .addCase(createNewRing.rejected, (state, action) => {
        state.newRingSubmitting = false;
      })

      // update ring by manager
      .addCase(updateRingByManager.pending, (state, action) => {
        state.updateByManagerLoading = true;
        state.updateByManagerFinished = false;
      })
      .addCase(updateRingByManager.fulfilled, (state, action) => {
        state.updateByManagerLoading = false;
        state.updateByManagerFinished = true;
      })
      .addCase(updateRingByManager.rejected, (state, action) => {
        state.updateByManagerLoading = false;
      });
  },
});

// actions
export const setNewRingSubmitted = ringsSlice.actions.setNewRingSubmitted;
export const setUpdateByManagerFinished = ringsSlice.actions.setUpdateByManagerFinished;
export const setSingleRing = ringsSlice.actions.setSingleRing;
export const clearSingleRing = ringsSlice.actions.clearSingleRing;

// schools selector
export const selectAllRings = (state: RootState) => state.rings.rings;
export const selectSingleRing = (state: RootState) => state.rings.singleRing;
export const selectNewRingSubmitting = (state: RootState) => state.rings.newRingSubmitting;
export const selectNewRingSubmitted = (state: RootState) => state.rings.newRingSubmitted;
export const selectUpdateByManagerLoading = (state: RootState) => state.rings.updateByManagerLoading;
export const selectUpdateByManagerFinished = (state: RootState) => state.rings.updateByManagerFinished;

export default ringsSlice.reducer;
