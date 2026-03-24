import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscriptionService } from "../../services/subscriptionService";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.getUserSubscriptions(userId);
      const list =
        res?.data?.subscribedTo ||
        res?.data?.SubscribedTo ||
        res?.data?.channels ||
        res?.data ||
        [];
      return Array.isArray(list)
        ? list.map((item) => item?.channel || item).filter(Boolean)
        : [];
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch");
    }
  },
);

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    channels: [],
    loading: false,
    error: null,
  },
  reducers: {
    addChannel: (state, action) => {
      const exists = state.channels.find((c) => c._id === action.payload._id);
      if (!exists) {
        state.channels.unshift(action.payload);
      }
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addChannel, removeChannel } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
