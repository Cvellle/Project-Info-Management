import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerAPI } from './api/registerAPI'
import { loginUser } from './api/loginAPI'
import { getMeAPI } from './api/getMeAPI'

const initialState = {
  currentUser: null,
  jwt: ''
}

export const registerAsync = createAsyncThunk('./api/registerAPI.js', async (data) => {
  const resData = await registerAPI(data)
  return resData
})

export const loginAsync = createAsyncThunk('./api/loginAPI.js', async (data) => {
  const resData = await loginUser(data)
  return resData
})

export const getMeAssync = createAsyncThunk('./api/getMeAPI.js', async (prop) => {
  const response = await getMeAPI(prop)
  return response.role
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state = {
        ...state,
        currentUser: {
          ...state.currentUser,
          role: action.payload
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state = {
          ...state,
          jwt: action.payload.jwt,
          currentUser: action.payload
        }
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt
        state.currentUser = action.payload.user
      })
      .addCase(getMeAssync.fulfilled, (state, action) => {
        state.currentUser = {
          ...state.currentUser,
          role: action.payload.name
        }
      })
  }
})

export const authState = (state) => state.auth
export const { setCurrentUser, setJwt } = authSlice.actions

export default authSlice.reducer
