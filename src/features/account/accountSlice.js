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
  name: 'account',
  initialState,
  reducers: {
    emptySelectedUser: (state) => {
      state.selectedUser = {
        ...state.selectedUser,
        id: '',
        username: '',
        email: '',
        role: '',
        blocked: '',
        confirmed: '',
        userPhoto: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMeAsync.fulfilled, (state, action) => {
      state.selectedUser = {
        ...state.currentUser,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        blocked: action.payload.blocked,
        confirmed: action.payload.confirmed,
        role: action.payload.role?.name,
        userPhoto: action.payload.userPhoto
      }
    })
  }
})

export const accountState = (state) => state.account
export const { emptySelectedUser } = accountSlice.actions

export default accountSlice.reducer
