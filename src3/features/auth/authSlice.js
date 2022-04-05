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
  if (!resData.error) {
    localStorage.setItem(
      'persist:root',
      JSON.stringify({ auth: JSON.stringify({ jwt: resData.jwt }) })
    )
  }
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
    },
    logout: (state) => {
      state = initialState
      return state
    }
  },
  extraReducers: {
    [registerAsync.fulfilled]: (state, action) => {
      state = {
        ...state,
        jwt: action.payload.jwt,
        currentUser: action.payload
      }
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.jwt = action.payload.jwt
      state.currentUser = action.payload.user
    },
    [getMeAssync.fulfilled]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        role: action.payload.name
      }
    },
    [getMeAssync.rejected]: (state) => {
      state = initialState
      return state
    }
  }
})

export const authState = (state) => state.auth
export const { setCurrentUser, setJwt, logout } = authSlice.actions

export default authSlice.reducer