import { configureStore } from "@reduxjs/toolkit";
import feedbackSlice from "./data-source/feedback/clientFeedbackSlice";
import authSlice from "./auth/authSlice";
import registrationSlice from "./registration/registrationSlice";
import feedbackMiddleware from "./middlewares/feedback.middleware";
import messagingSlice from "./messaging/messagingSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice,
    auth: authSlice,
    registration: registrationSlice,
    messaging: messagingSlice,
  },
  middleware: [feedbackMiddleware],
});
