import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as http from "./data-source/http-actions";
import { RootState } from "../store.types";

// Initial state
const initialState = {
  chats: [] as http.IAllChatResponse[],
  singleChat: null as http.ISingleChatResponse | null,

  chatsLoading: false,
  singleChatLoading: false,
  singleChatUpdating: false,
};

// thunk actions
export const getAllChats = createAsyncThunk("messaging/chats", http.getAllChats);
export const getSingleChat = createAsyncThunk("messaging/singleChat", http.getChat);
export const sendMessage = createAsyncThunk("messaging/sendMessage", http.sendMessage);

export const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    clearSingleChat(state) {
      state.singleChat = null;
      state.singleChatLoading = false;
    },
    setUpdatingSingleChat(state) {
      state.singleChatUpdating = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting all chats
      .addCase(getAllChats.pending, (state, action) => {
        state.chatsLoading = true;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.chatsLoading = false;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.chatsLoading = false;
      })

      // get single chat
      .addCase(getSingleChat.pending, (state, action) => {
        state.singleChatLoading = true;
      })
      .addCase(getSingleChat.fulfilled, (state, action) => {
        state.singleChat = action.payload;
        state.singleChatLoading = false;
        state.singleChatUpdating = false;
      })
      .addCase(getSingleChat.rejected, (state, action) => {
        state.singleChatLoading = false;
        state.singleChatUpdating = false;
      })

      // send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.singleChat?.messages.push(action.payload);
      });
  },
});

// actions
export const clearSingleChat = messagingSlice.actions.clearSingleChat;
export const setUpdatingSingleChat = messagingSlice.actions.setUpdatingSingleChat;

// chats selector
export const selectAllChats = (state: RootState) => state.messaging.chats;
export const selectAllChatsLoading = (state: RootState) => state.messaging.chatsLoading;
export const selectSingleChat = (state: RootState) => state.messaging.singleChat;
export const selectSingleChatLoading = (state: RootState) => state.messaging.singleChatLoading;
export const selectSingleChatUpdating = (state: RootState) => state.messaging.singleChatUpdating;

export default messagingSlice.reducer;
