import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from './api/getUsersAPI'

const initialState = {
  users: []
}

export const getUsersAssync = createAsyncThunk('./api/getItems.js', async () => {
  const response = await getUsers()
  return response
})

export const updateUserUsersAssync = createAsyncThunk(
  './api/updateUserAPI.js',
  async (idToUpdate, updateBody) => {
    const response = await getUsers(idToUpdate, updateBody)
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
    builder.addCase(getUsersAssync.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }
})

export const { editUser } = usersSlice.actions

export const selectUsers = (state) => state.users

export default usersSlice.reducer
