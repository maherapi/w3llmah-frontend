import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  students: [] as http.IStudentsItemResponse[],
  singleStudent: null as http.IStudentsItemResponse | null,
  studentsLoading: false,

  updatingStudentLoading: false,
  updatingStudentFinished: false,
};

// thunk actions
export const getAllStudentsManager = createAsyncThunk("students/byManager", http.getAllStudentsManager);
export const updateStudentByManager = createAsyncThunk("students/updateByManager", http.updateStudentByManager);

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setSingleStudent(state, action) {
      state.singleStudent = action.payload;
    },
    clearSingleStudent(state) {
      state.singleStudent = null;
    },
    setUpdatingStudentFinished(state, action) {
      state.updatingStudentFinished = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting all students
      .addCase(getAllStudentsManager.pending, (state, action) => {
        state.studentsLoading = true;
      })
      .addCase(getAllStudentsManager.fulfilled, (state, action) => {
        state.students = action.payload;
        state.studentsLoading = false;
      })
      .addCase(getAllStudentsManager.rejected, (state, action) => {
        state.studentsLoading = false;
      })

      // updating student by manager
      .addCase(updateStudentByManager.pending, (state, action) => {
        state.updatingStudentLoading = true;
        state.updatingStudentFinished = false;
      })
      .addCase(updateStudentByManager.fulfilled, (state, action) => {
        state.updatingStudentLoading = false;
        state.updatingStudentFinished = true;
      })
      .addCase(updateStudentByManager.rejected, (state, action) => {
        state.updatingStudentLoading = false;
      });
  },
});

// actions
export const setSingleStudent = studentsSlice.actions.setSingleStudent;
export const clearSingleStudent = studentsSlice.actions.clearSingleStudent;
export const setUpdatingStudentFinished = studentsSlice.actions.setUpdatingStudentFinished;

// students selector
export const selectAllStudentsManager = (state: RootState) => state.students.students;
export const selectSingleStudentManager = (state: RootState) => state.students.singleStudent;
export const selectUpdatingStudentLoading = (state: RootState) => state.students.updatingStudentLoading;
export const selectUpdatingStudentFinished = (state: RootState) => state.students.updatingStudentFinished;

export default studentsSlice.reducer;
