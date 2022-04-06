import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMeAPI } from 'features/auth/api/getMeAPI'
import { getRoles } from './api/getRolesAPI'
import { getUsers } from './api/getUsersAPI'
import { updateMeAPI } from './api/updateMeAPI'

const initialState = {
  users: [],
  selectedUser: {},
  roles: []
}

export const getUsersAsync = createAsyncThunk('./api/getUsersAPI.js', async () => {
  const response = await getUsers()
  return response
})

export const getMeAsync = createAsyncThunk('./api/getOneUserAPI.js', async () => {
  const response = await getMeAPI()
  return response
})

export const getRolesAsync = createAsyncThunk('./api/getRolesAPI.js', async () => {
  const response = await getRoles()
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
  reducers: {
    editUser: (state, action) => {
      state.selectedUser = {
        ...state.selectedUser,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
        blocked: action.payload.blocked,
        confirmed: action.payload.confirmed
      }
    },
    emptySelectedUser: (state) => {
      state.selectedUser = {
        ...state.selectedUser,
        id: '',
        username: '',
        email: '',
        role: '',
        blocked: '',
        confirmed: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getRolesAsync.fulfilled, (state, action) => {
        state.roles = action.payload.roles
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
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

export const { editUser, emptySelectedUser } = accountSlice.actions

export const selectUsers = (state) => state.users

export default accountSlice.reducer
