import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  user: null as any,
  name: null as string | null | undefined,
  formSubmitting: false,
  formSubmitted: false,
  verifying: false,
  verified: false,
  schools: [] as http.IAllSchoolsResponse[],
  sourahs: [] as http.IAllSourahsResponse[],
};

// thunk actions
export const registerStudent = createAsyncThunk("registration/student", http.registerStudent);
export const getAllSchools = createAsyncThunk("registration/allSchools", http.getAllSchools);
export const getAllSourahs = createAsyncThunk("registration/allSourahs", http.getAllSourahs);

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // student registration
      .addCase(registerStudent.pending, (state, action) => {
        state.formSubmitting = true;
        state.name = action.meta.arg.name;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.formSubmitting = false;
        state.formSubmitted = true;
        state.user = action.payload.user;
        state.user.student = action.payload.student;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.formSubmitting = false;
      })

      // schools
      .addCase(getAllSchools.fulfilled, (state, action) => {
        state.schools = action.payload
      })

      // sourahs
      .addCase(getAllSourahs.fulfilled, (state, action) => {
        state.sourahs = action.payload
      })
  },
});

// Selectors
export const selectUser = (state: RootState) => state.registration.user;
export const selectStudent = (state: RootState) => state.registration.user.student;
export const selectSubmitted = (state: RootState) => state.registration.formSubmitted;
export const selectSubmitting = (state: RootState) => state.registration.formSubmitting;
export const selectVerifying = (state: RootState) => state.registration.verifying;
export const selectVerified = (state: RootState) => state.registration.verified;

// schools selector
export const selectAllSchools = (state: RootState) => state.registration.schools;

// sourahs selector
export const selectAllSourahs = (state: RootState) => state.registration.sourahs;

export default registrationSlice.reducer;
