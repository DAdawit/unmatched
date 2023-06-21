import { createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "../constants/constants";
import { toast } from "react-toastify";

import { api } from "./api";
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export default userSlice.reducer;
// Actions
const { loginSuccess, logoutSuccess } = userSlice.actions;
export const login = ({ email, password }) => async (dispatch) => {
  console.log(email, password);
  try {
    const res = await api.post(apiConfig.root + apiConfig.signin, {
      email,
      password,
    });
    dispatch(loginSuccess({ email }));
  } catch (e) {
    toast.error(e.response?.data?.errors?.detail[0]);
  }
};
export const logout = () => async (dispatch) => {
  try {
    const res = await api.post("/api/auth/logout/");
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
