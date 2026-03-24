import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    videos: [], // full video objects
    progress: {}, // { videoId: seconds }
  },
  reducers: {
    addToHistory: (state, action) => {
      const video = action.payload;
      // Remove if already exists
      state.videos = state.videos.filter((v) => v._id !== video._id);
      // Add to top
      state.videos.unshift(video);
      // Keep max 50
      if (state.videos.length > 50) state.videos.pop();
    },
    removeFromHistory: (state, action) => {
      state.videos = state.videos.filter((v) => v._id !== action.payload);
    },
    clearHistory: (state) => {
      state.videos = [];
      state.progress = {};
    },
    saveProgress: (state, action) => {
      const { videoId, seconds } = action.payload;
      state.progress[videoId] = seconds;
    },
    clearProgress: (state, action) => {
      delete state.progress[action.payload];
    },
  },
});

export const {
  addToHistory,
  removeFromHistory,
  clearHistory,
  saveProgress,
  clearProgress,
} = historySlice.actions;

export default historySlice.reducer;
