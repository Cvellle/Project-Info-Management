import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerAPI } from './api/registerAPI'
import { loginUser } from './api/loginAPI'
import { getMeAPI } from './api/getMeAPI'
// import { resetProjects } from 'features/dashboard/dashboardSlice'

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

export const getMeAsync = createAsyncThunk('./api/getMeAPI.js', async () => {
  const response = await getMeAPI()
  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        blocked: action.payload.blocked,
        confirmed: action.payload.confirmed,
        role: action.payload.role?.name,
        userPhoto: action.payload.userPhoto
      }
    },
    logout: (state) => {
      // dispatch(resetProjects())
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
    [getMeAsync.fulfilled]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        blocked: action.payload.blocked,
        confirmed: action.payload.confirmed,
        role: action.payload.role?.name,
        userPhoto: action.payload.userPhoto
      }
    },
    [getMeAsync.rejected]: (state) => {
      state = initialState
      return state
    }
  }
})

export const authState = (state) => state.auth
export const { setCurrentUser, setJwt, logout } = authSlice.actions

export default authSlice.reducer
