import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMeAPI } from 'features/auth/api/getMeAPI'
import { updateMeAPI } from './api/updateMeAPI'

const initialState = {
  users: [],
  selectedUser: {},
  roles: []
}

export const getMeAsync = createAsyncThunk('./api/getOneUserAPI.js', async () => {
  const response = await getMeAPI()
  return response
})

export const updateMeAsync = createAsyncThunk(
  './api/updateMeAPI.js',
  async (idToUpdate, updateBody) => {
    const response = await updateMeAPI(idToUpdate, updateBody)
    return response
  }
)

export const accountSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeAsync.fulfilled, (state, action) => {
      state.selectedUser = {
        ...state.selectedUser,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role?.name,
        blocked: action.payload.blocked,
        confirmed: action.payload.confirmed
      }
    })
  }
})

export const selectUsers = (state) => state.users

export default accountSlice.reducer
