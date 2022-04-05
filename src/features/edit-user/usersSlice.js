import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOneUser } from './api/getOneUserAPI'
import { getRoles } from './api/getRolesAPI'
import { getUsers } from './api/getUsersAPI'
import { updateUser } from './api/updateUserAPI'

const initialState = {
  users: [],
  selectedUser: {},
  roles: []
}

export const getUsersAsync = createAsyncThunk('./api/getUsersAPI.js', async () => {
  const response = await getUsers()
  return response
})

export const getOneUserAsync = createAsyncThunk('./api/getOneUserAPI.js', async (idToPass) => {
  const response = await getOneUser(idToPass)
  return response
})

export const getRolesAsync = createAsyncThunk('./api/getRolesAPI.js', async () => {
  const response = await getRoles()
  return response
})

export const updateUserUsersAsync = createAsyncThunk(
  './api/updateUserAPI.js',
  async (idToUpdate, updateBody) => {
    const response = await updateUser(idToUpdate, updateBody)
    return response
  }
)

export const usersSlice = createSlice({
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

      console.log(state.selectedUser)
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
      .addCase(getOneUserAsync.fulfilled, (state, action) => {
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

export const { editUser, emptySelectedUser } = usersSlice.actions

export const selectUsers = (state) => state.users

export default usersSlice.reducer
