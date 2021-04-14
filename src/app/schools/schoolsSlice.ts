import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  schools: [] as http.ISchoolsItemResponse[],
  singleSchool: null as http.ISchoolsItemResponse | null,
  schoolsLoading: false,

  activationSchoolLoading: false,
  activationSchoolFinished: false,
};

// thunk actions
export const getAllSchoolsAdmin = createAsyncThunk("schools/admin", http.getAllSchoolsAdmin);
export const updateActivationSchool = createAsyncThunk("schools/activation", http.updateActivationSchool);

export const schoolsSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {
    setSingleSchool(state, action) {
      state.singleSchool = action.payload;
    },
    clearSingleSchool(state) {
      state.singleSchool = null;
    },
    setActivationSchoolFinished(state, action) {
      state.activationSchoolFinished = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting all schools
      .addCase(getAllSchoolsAdmin.pending, (state, action) => {
        state.schoolsLoading = true;
      })
      .addCase(getAllSchoolsAdmin.fulfilled, (state, action) => {
        state.schools = action.payload;
        state.schoolsLoading = false;
      })
      .addCase(getAllSchoolsAdmin.rejected, (state, action) => {
        state.schoolsLoading = false;
      })

      // updating activation for school
      .addCase(updateActivationSchool.pending, (state, action) => {
        state.activationSchoolLoading = true;
        state.activationSchoolFinished = false;
      })
      .addCase(updateActivationSchool.fulfilled, (state, action) => {
        state.activationSchoolLoading = false;
        state.activationSchoolFinished = true;
      })
      .addCase(updateActivationSchool.rejected, (state, action) => {
        state.activationSchoolLoading = false;
      });
  },
});

// actions
export const setSingleSchool = schoolsSlice.actions.setSingleSchool;
export const clearSingleSchool = schoolsSlice.actions.clearSingleSchool;
export const setActivationSchoolFinished = schoolsSlice.actions.setActivationSchoolFinished;

// schools selector
export const selectAllSchoolsAdmin = (state: RootState) => state.schools.schools;
export const selectSingleSchoolAdmin = (state: RootState) => state.schools.singleSchool;
export const selectActivationSchoolLoading = (state: RootState) => state.schools.activationSchoolLoading;
export const selectActivationSchoolFinished = (state: RootState) => state.schools.activationSchoolFinished;

export default schoolsSlice.reducer;
