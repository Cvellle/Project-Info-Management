import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerAPI } from './api/registerAPI'
import { loginUser } from './api/loginAPI'

const initialState = {
  currentUser: '',
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
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state = {
        state,
        jwt: action.payload.jwt,
        currentUser: action.payload
      }
    })
  }
})

export const { setCurrentUser, setJwt } = authSlice.actions

export default authSlice.reducer
