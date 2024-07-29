import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constants.js";

const initialState = {
  registerUser: {},
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Register
    registerRequest: (state) => {
      state.isLoading = true,
      state.error = null
    },
    registerSuccess : (state, action) => {
      state.isLoading = false,
      state.registerUser = action.payload
    },
    registerFail: (state, action) => {
      state.isLoading = false,
      state.error = action.payload
    },
    registerFailRefresh: (state) => {
      state.isLoading = false,
      state.error = null
    },

    // Login
    loginRequest: (state) => {
      (state.isLoading = true), (state.error = null);
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },

    // logout
    logoutRequest: (state) => {
      (state.isLoading = true), (state.error = null);
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      localStorage.removeItem('user');
    },
    logoutFail: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },
  },
});
export const {
  registerRequest,
  registerSuccess,
  registerFail,

  loginRequest,
  loginSuccess,
  loginFail,

  logoutRequest,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;

export default authSlice.reducer;

// Register
export const register = (userData) => (
  async (dispatch) => {
    dispatch(registerRequest())
    try {
      const response = await axios.post(`${baseURL}/users/register`, userData)
      dispatch(registerSuccess(response.data))
    } catch (err) {
      // console.log("err", err);
      dispatch(registerFail(err.response.data))
    }
  }
)

// Login 
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${baseURL}/users/login`, userData);
    dispatch(loginSuccess(response.data));
  } catch (err) {
    // console.log("err", err);
    dispatch(loginFail(err.response.data));
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const response = await axios.post(`${baseURL}/users/logout`);
    dispatch(logoutSuccess(response.data));
  } catch (err) {
    // console.log(err);
    dispatch(logoutFail(err.response.data));
  }
};
