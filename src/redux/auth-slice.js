import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "AUTH",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    loggoutRes : null
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state , action) {
      state.user = null;
      state.loggoutRes = action.payload;
    }
  },
});


export const loginAsync = (credentials) => async (dispatch) => {
  dispatch(authSlice.actions.loginStart());

  try {
    const response = await axios.post("/auth/login", credentials , { withCredentials: true });
    const userData = await response.data; 
    dispatch(authSlice.actions.loginSuccess(userData));
  } catch (error) {
    console.log(error);
    dispatch(authSlice.actions.loginFailure(error.message));
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth/logout");
    const logoutMsg = await response.data;
    dispatch(authSlice.actions.logout(logoutMsg));
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;

export const authAction =  authSlice.actions;

