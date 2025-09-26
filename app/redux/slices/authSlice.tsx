import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = `https://api.s3rhub.com/api/v1/user`;

type AuthState = {
  user: any | null;
  loading: boolean;
  error: string | null;
};

// Initial State
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Utility: get token from localStorage
function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

// ✅ Fetch user using token from localStorage
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (!token) return rejectWithValue("No access token found. Please log in.");

      const response = await axios.get(`https://api.s3rhub.com/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch user");
    }
  }
);

// ✅ Logout (removes token locally and optionally informs backend)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      localStorage.removeItem("accessToken");

      if (token) {
        await axios.post(
          `${API_URL}/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional helpers
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Failed to fetch user";
        state.loading = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Logout failed";
      });
  },
});

export const { clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
