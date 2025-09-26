// app/store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode:
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === null
        ? true // ✅ Default to dark mode if no value in localStorage
        : localStorage.getItem("darkMode") === "true"
      : true, // ✅ For SSR or non-browser, default to dark
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
      document.documentElement.classList.toggle("dark", state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload);
      document.documentElement.classList.toggle("dark", action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
