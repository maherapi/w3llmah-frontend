import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  orders: [] as http.IOrdersItemResponse[],
  singleOrder: null as http.IOrdersItemResponse | null,
  ordersLoading: false,

  approveSchoolLoading: false,
  approveSchoolFinished: false,

  approveTeacherLoading: false,
  approveTeacherFinished: false,

  approveStudentLoading: false,
  approveStudentFinished: false,
};

// thunk actions
export const getAllOrders = createAsyncThunk("orders/orders", http.getAllOrders);
export const approveSchool = createAsyncThunk("orders/approveSchool", http.approveSchool);
export const approveTeacher = createAsyncThunk("orders/approveTeacher", http.approveTeacher);
export const approveStudent = createAsyncThunk("orders/approveStudent", http.approveStudent);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSingleOrder(state, action) {
      state.singleOrder = action.payload;
    },
    clearSingleOrder(state) {
      state.singleOrder = null;
    },
    setApproveSchoolFinished(state, action) {
      state.approveSchoolFinished = action.payload;
    },
    setApproveTeacherFinished(state, action) {
      state.approveTeacherFinished = action.payload;
    },
    setApproveStudentFinished(state, action) {
      state.approveStudentFinished = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting all orders
      .addCase(getAllOrders.pending, (state, action) => {
        state.ordersLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersLoading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.ordersLoading = false;
      })

      // getting all orders
      .addCase(approveSchool.pending, (state, action) => {
        state.approveSchoolLoading = true;
        state.approveSchoolFinished = false;
      })
      .addCase(approveSchool.fulfilled, (state, action) => {
        state.approveSchoolLoading = false;
        state.approveSchoolFinished = true;
      })
      .addCase(approveSchool.rejected, (state, action) => {
        state.approveSchoolLoading = false;
      })

      // approve teacher order by manager
      .addCase(approveTeacher.pending, (state, action) => {
        state.approveTeacherLoading = true;
        state.approveTeacherFinished = false;
      })
      .addCase(approveTeacher.fulfilled, (state, action) => {
        state.approveTeacherLoading = false;
        state.approveTeacherFinished = true;
      })
      .addCase(approveTeacher.rejected, (state, action) => {
        state.approveTeacherLoading = false;
      })

      // approve student order by manager
      .addCase(approveStudent.pending, (state, action) => {
        state.approveStudentLoading = true;
        state.approveStudentFinished = false;
      })
      .addCase(approveStudent.fulfilled, (state, action) => {
        state.approveStudentLoading = false;
        state.approveStudentFinished = true;
      })
      .addCase(approveStudent.rejected, (state, action) => {
        state.approveStudentLoading = false;
      });
  },
});

// actions
export const setSingleOrder = ordersSlice.actions.setSingleOrder;
export const clearSingleOrder = ordersSlice.actions.clearSingleOrder;
export const setApproveSchoolFinished = ordersSlice.actions.setApproveSchoolFinished;
export const setApproveTeacherFinished = ordersSlice.actions.setApproveTeacherFinished;
export const setApproveStudentFinished = ordersSlice.actions.setApproveStudentFinished;

// orders selector
export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectSingleOrder = (state: RootState) => state.orders.singleOrder;
export const selectApproveSchoolLoading = (state: RootState) => state.orders.approveSchoolLoading;
export const selectApproveSchoolFinished = (state: RootState) => state.orders.approveSchoolFinished;
export const selectApproveTeacherLoading = (state: RootState) => state.orders.approveTeacherLoading;
export const selectApproveTeacherFinished = (state: RootState) => state.orders.approveTeacherFinished;
export const selectApproveStudentLoading = (state: RootState) => state.orders.approveStudentLoading;
export const selectApproveStudentFinished = (state: RootState) => state.orders.approveStudentFinished;

export default ordersSlice.reducer;
