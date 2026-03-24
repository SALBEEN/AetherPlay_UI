import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import historyReducer from "./slices/historySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
    history: historyReducer,
  },
});

export default store;
