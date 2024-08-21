import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userActions";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
    },
  },
  setToken: (state, action) => {
    state.token = action.payload;
  },
  setStatus: (state, action) => {
    state.status = action.payload;
  },
  setError: (state, action) => {
    state.error = action.payload;
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { getUser, setToken, setStatus, setError } = userSlice.actions;
export default userSlice.reducer;
