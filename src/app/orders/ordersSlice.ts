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
};

// thunk actions
export const getAllOrders = createAsyncThunk("orders/orders", http.getAllOrders);
export const approveSchool = createAsyncThunk("orders/approveSchool", http.approveSchool);

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
      });
  },
});

// actions
export const setSingleOrder = ordersSlice.actions.setSingleOrder;
export const clearSingleOrder = ordersSlice.actions.clearSingleOrder;
export const setApproveSchoolFinished = ordersSlice.actions.setApproveSchoolFinished;

// orders selector
export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectSingleOrder = (state: RootState) => state.orders.singleOrder;
export const selectApproveSchoolLoading = (state: RootState) => state.orders.approveSchoolLoading;
export const selectApproveSchoolFinished = (state: RootState) => state.orders.approveSchoolFinished;

export default ordersSlice.reducer;
