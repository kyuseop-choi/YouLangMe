import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8080/";
const user = JSON.parse(localStorage.getItem("user"));
export const login = createAsyncThunk("LOGIN", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "login/", userInfo);
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    console.log(user);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const signup = createAsyncThunk("SIGNUP", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "signup/", userInfo);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk("LOGOUT", async () => {
  localStorage.removeItem("user");
});

export const nickname = createAsyncThunk("NICKNAME", async (name, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + `user/check-name/?name=${name}`);
    console.log(response.data.data);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response);
  }
});
// const social = () => {
//   return (window.location.href = API_URL + "oauth2/authorization/google");
// };
// export const socialLogin = createAsyncThunk(
//   "auth/sociallogin",
//   async (thunkAPI) => {
//     try {
//       const data = await social();
//       return { user: data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response);
//     }
//   }
// );

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    signup,
    logout,
    nickname,
    socialLogin(state) {
      return { isLoggedIn: true, user };
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export let { socialLogin } = authSlice.actions;
export default authSlice;
