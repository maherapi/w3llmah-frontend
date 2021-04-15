import { combineReducers, configureStore } from "@reduxjs/toolkit";
import feedbackSlice from "./data-source/feedback/clientFeedbackSlice";
import authSlice from "./auth/authSlice";
import registrationSlice from "./registration/registrationSlice";
import feedbackMiddleware from "./middlewares/feedback.middleware";
import messagingSlice from "./messaging/messagingSlice";
import ordersSlice from "./orders/ordersSlice";
import schoolsSlice from "./schools/schoolsSlice";
import ringsSlice from "./rings/ringsSlice";

const combinedReducer = combineReducers({
  feedback: feedbackSlice,
  auth: authSlice,
  registration: registrationSlice,
  messaging: messagingSlice,
  orders: ordersSlice,
  schools: schoolsSlice,
  rings: ringsSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout/fulfilled") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [feedbackMiddleware],
});
