import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getCurrentUser();
      const userData =
        res?.data?.data?.user ||
        res?.data?.data ||
        res?.data?.user ||
        res?.data ||
        null;
      return userData;
    } catch (err) {
      // Fall back to localStorage if API fails
      const localUser = localStorage.getItem("user");
      if (localUser) {
        try {
          return JSON.parse(localUser);
        } catch {
          return rejectWithValue("Failed to parse local user");
        }
      }
      return rejectWithValue(
        err?.response?.data?.message || "Not authenticated",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return rejectWithValue(err?.response?.data?.message || "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return null;
      }
    })(),
    isAuthenticated: !!localStorage.getItem("accessToken"),
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep existing auth state if we have a token
        if (!localStorage.getItem("accessToken")) {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even if logout API fails
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
