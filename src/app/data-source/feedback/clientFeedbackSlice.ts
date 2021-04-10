import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store.types";

export const clientFeedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: 0,
    error: null as null | string,
    success: null as null | string,
  },
  reducers: {
    startLoading: (state) => {
      state.loading += 1;
    },
    stopLoading: (state) => {
      state.loading -= 1;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
});

// Action creators
export const {
  startLoading,
  stopLoading,
  setError,
  removeError,
  setSuccess,
  removeSuccess,
} = clientFeedbackSlice.actions;

// Selectors
export const selectFeedbackLoading = (state: RootState) => state.feedback.loading > 0;
export const selectFeedbackError = (state: RootState) => state.feedback.error;
export const selectFeedbackSuccess = (state: RootState) => state.feedback.success;

export default clientFeedbackSlice.reducer;
