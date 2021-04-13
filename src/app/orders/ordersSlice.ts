import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  orders: [] as http.IOrdersItemResponse[],
  singleOrder: null as http.IUserOrdersResponse | null,

  ordersLoading: false,
};

// thunk actions
export const getAllOrders = createAsyncThunk("orders/orders", http.getAllOrders);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getting all chats
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
  },
});

// chats selector
export const selectAllOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
