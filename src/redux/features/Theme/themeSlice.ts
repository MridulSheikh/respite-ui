import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TThemeState = {
  theme: "light" | "dark";
};

const initialState: TThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogle: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toogle } = themeSlice.actions;
export default themeSlice.reducer;
export const useTheme = (state: RootState) => state.theme.theme;
