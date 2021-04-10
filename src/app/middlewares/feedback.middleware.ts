import { AsyncThunkAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setError, startLoading, stopLoading } from "../data-source/feedback/clientFeedbackSlice";

const feedbackMiddleware: Middleware = (store) => (next) => async (action) => {
  try {
    if (typeof action === "function") {
      const asyncAction = <AsyncThunkAction<any, any, any>>(<unknown>action);

      store.dispatch(startLoading());
      const res: any = await asyncAction(next, store.getState, {});
      store.dispatch(stopLoading());
      if (res.error) {
        throw res.error;
      }
      return res as PayloadAction;
    } else {
      return next(action);
    }
  } catch (e) {
    store.dispatch(setError(e.message));
  }
};

export default feedbackMiddleware;
