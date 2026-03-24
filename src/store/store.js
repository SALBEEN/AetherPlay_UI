import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
  },
});

export default store;
