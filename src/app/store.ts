import { configureStore } from "@reduxjs/toolkit";
import feedbackSlice from "./data-source/feedback/clientFeedbackSlice";
import authSlice from "./auth/authSlice";
import registrationSlice from "./registration/registrationSlice";
import feedbackMiddleware from "./middlewares/feedback.middleware";

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice,
    auth: authSlice,
    registration: registrationSlice,
  },
  middleware: [
    feedbackMiddleware
  ]
});
