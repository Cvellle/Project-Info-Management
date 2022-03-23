import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerAPI } from './api/registerAPI'

const initialState = {
  currentUser: {},
  jwt: ''
}

export const registerAssync = createAsyncThunk('./api/registerAPI.js', async () => {
  const response = await registerAPI()
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state = {
        ...state,
        currentUser: action.payload
        // jwt: action.payload.jwt
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(registerAssync.pending, (state) => {
      //   state.status = 'loading'
      // })
      .addCase(registerAssync.fulfilled, (state, action) => {
        console.log(action.payload)
        state = {
          ...state,
          currentUser: action.payload
        }
      })
  }
})

export const { setCurrentUser, setJwt } = authSlice.actions

export const selectProjects = (state) => state.auth

export default authSlice.reducer
