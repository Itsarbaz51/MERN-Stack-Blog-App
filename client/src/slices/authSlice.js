import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../constants.js";

// Error handling 
function parserHtmlError(html){
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html')
  const errorElement = doc.querySelector('pre') || doc.querySelector('body');
  return errorElement ? errorElement.textContent : 'An error Accurred.';
}
const initialState = {
  registerUser: {},
  loginUser: localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')) : null,
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

    // Login
    loginRequest: (state) => {
      (state.isLoading = true), (state.error = null);
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.loginUser = action.payload;
      localStorage.setItem('loginUser', JSON.stringify(action.payload));
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
      state.loginUser = null;
      localStorage.removeItem('loginUser');
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
      if(err.response && err.response.data) {
        const htmlError = err.response.data;
        const errorMessage = parserHtmlError(htmlError)
        dispatch(registerFail(errorMessage))
      }
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
    if (err.response && err.response.data) {
      const htmlError = err.response.data
      const errorMessage = parserHtmlError(htmlError)
      dispatch(loginFail(errorMessage));
    }
  }
};

// Logout
export const logout = (userId, accToken) => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const response = await axios.post(`${baseURL}/users/logout`,userId,
      {withCredentials: true, headers: {Authorization: `Bearer ${accToken}`}});
    dispatch(logoutSuccess(response.data));
  } catch (err) {
    if (err.response && err.response.data) {
      const htmlError = err.response.data
      const errorMessage = parserHtmlError(htmlError)
      dispatch(logoutFail(errorMessage));
    }
  }
};
