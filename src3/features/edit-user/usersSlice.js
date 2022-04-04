import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOneUser } from './api/getOneUserAPI'
import { getUsers } from './api/getUsersAPI'
import { updateUser } from './api/updateUserAPI'

const initialState = {
  users: [],
  selectedUser: {}
}

export const getUsersAsync = createAsyncThunk('./api/getUsersAPI.js', async () => {
  const response = await getUsers()
  return response
})

export const getOneUserAsync = createAsyncThunk('./api/getOneUserAPI.js', async (idToPass) => {
  const response = await getOneUser(idToPass)
  return response
})

export const updateUserUsersAssync = createAsyncThunk(
  './api/updateUserAPI.js',
  async (idToUpdate, updateBody) => {
    console.log(updateBody)
    const response = await updateUser(idToUpdate, updateBody)
    return response
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action) => {
      let currentId = action.payload.id
      state.users = [
        ...state.users.slice(0, currentId - 1),
        action.payload,
        ...state.users.slice(currentId)
      ]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getOneUserAsync.fulfilled, (state, action) => {
        state.selectedUser = {
          ...state.selectedUser,
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role.name,
          blocked: action.payload.blocked,
          confirmed: action.payload.confirmed
        }
      })
  }
})

export const { editUser } = usersSlice.actions

export const selectUsers = (state) => state.users

export default usersSlice.reducer
