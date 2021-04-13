import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRole } from "./user.interface";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const localStorageState = localStorage.getItem("auth") || "";
const initialState = localStorageState
  ? JSON.parse(localStorageState)
  : {
      loggedIn: false,
      accessToken: null as string | null,
      user: null as any,
      username: null as string | null,
      role: null as UserRole,
      OTPsending: false,
      OTPsent: false,
      OTPChecking: false,
      OTPChecked: false,
    };

// thunk actions
export const sendOTP = createAsyncThunk("auth/otp", http.sendOTP);
export const login = createAsyncThunk("auth/login", http.login);
export const logout = createAsyncThunk("auth/logout", http.logout);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOTPSent(state) {
      state.OTPsent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // send otp
      .addCase(sendOTP.pending, (state, action) => {
        state.OTPsending = true;
        state.username = action.meta.arg.username;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.OTPsending = false;
        state.OTPsent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.OTPsending = false;
      })

      // login
      .addCase(login.pending, (state, action) => {
        state.OTPChecking = true;
        state.username = action.meta.arg.username;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.userable_type;
        state.OTPChecking = false;
        state.OTPChecked = true;
        state.OTPsent = null;
        const savedState = {
          loggedIn: state.loggedIn,
          accessToken: state.accessToken,
          user: state.user,
          role: state.role,
        };
        localStorage.setItem("auth", JSON.stringify(savedState));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.OTPChecking = false;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.accessToken = null;
        state.user = null;
        state.username = null;
        state.role = null;
        state.OTPsending = false;
        state.OTPsent = false;
        state.OTPChecking = false;
        state.OTPChecked = false;
        localStorage.clear();
      });
  },
});

// Actions
export const resetOTPSent = authSlice.actions.resetOTPSent;

// Selectors
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectUserRole = (state: RootState) => state.auth.role;
export const selectLoggedInUser = (state: RootState) => state.auth.user;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectOTPSending = (state: RootState) => state.auth.OTPsending;
export const selectOTPSent = (state: RootState) => state.auth.OTPsent;
export const selectOTPChecking = (state: RootState) => state.auth.OTPChecking;
export const selectOTPChecked = (state: RootState) => state.auth.OTPChecked;

export default authSlice.reducer;
