import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from './api/getUsersAPI'

const initialState = {
  users: null
}

export const getUsersAssync = createAsyncThunk('./api/getUsersAPI.js', async () => {
  const response = await getUsers()
  return response.data
})

export const dashboardSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editProject: (state, action) => {
      console.log(action)
      // let currentId = action.payload.id
      state.projects = [
        // ...state.projects.slice(0, currentId - 1),
        // action.payload,
        // ...state.projects.slice(currentId)
      ]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      console.log(action.payload)
      state.users = action.payload
    })
  }
})

export const { increment, decrement, editProject } = dashboardSlice.actions

export const selectProject = (state) => state.project.project

export default dashboardSlice.reducer
