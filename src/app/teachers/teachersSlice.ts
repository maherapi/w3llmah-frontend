import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  teachers: [] as http.ITeachersItemResponse[],
  singleTeacher: null as http.ITeachersItemResponse | null,
  teachersLoading: false,

  updatingTeacherLoading: false,
  updatingTeacherFinished: false,
};

// thunk actions
export const getAllTeachersManager = createAsyncThunk("teachers/byManager", http.getAllTeachersManager);
export const updateTeacherByManager = createAsyncThunk("teachers/updateByManager", http.updateTeacherByManager);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setSingleTeacher(state, action) {
      state.singleTeacher = action.payload;
    },
    clearSingleTeacher(state) {
      state.singleTeacher = null;
    },
    setUpdatingTeacherFinished(state, action) {
      state.updatingTeacherFinished = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting all teachers
      .addCase(getAllTeachersManager.pending, (state, action) => {
        state.teachersLoading = true;
      })
      .addCase(getAllTeachersManager.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.teachersLoading = false;
      })
      .addCase(getAllTeachersManager.rejected, (state, action) => {
        state.teachersLoading = false;
      })

      // updating teacher by manager
      .addCase(updateTeacherByManager.pending, (state, action) => {
        state.updatingTeacherLoading = true;
        state.updatingTeacherFinished = false;
      })
      .addCase(updateTeacherByManager.fulfilled, (state, action) => {
        state.updatingTeacherLoading = false;
        state.updatingTeacherFinished = true;
      })
      .addCase(updateTeacherByManager.rejected, (state, action) => {
        state.updatingTeacherLoading = false;
      });
  },
});

// actions
export const setSingleTeacher = teachersSlice.actions.setSingleTeacher;
export const clearSingleTeacher = teachersSlice.actions.clearSingleTeacher;
export const setUpdatingTeacherFinished = teachersSlice.actions.setUpdatingTeacherFinished;

// teachers selector
export const selectAllTeachersManager = (state: RootState) => state.teachers.teachers;
export const selectSingleTeacherManager = (state: RootState) => state.teachers.singleTeacher;
export const selectUpdatingTeacherLoading = (state: RootState) => state.teachers.updatingTeacherLoading;
export const selectUpdatingTeacherFinished = (state: RootState) => state.teachers.updatingTeacherFinished;

export default teachersSlice.reducer;
