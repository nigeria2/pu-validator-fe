import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

export const selectUserData = (state) => state.auth.user;
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
