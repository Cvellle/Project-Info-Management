import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProject } from './api/pojectAPI'

const initialState = {
  project: null
}

export const getProjectAssync = createAsyncThunk('./api/pojectAPI.js', async (idToPass) => {
  const response = await getProject(idToPass)
  return response.data
})

export const dashboardSlice = createSlice({
  name: 'project',
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
    builder.addCase(getProject.fulfilled, (state, action) => {
      console.log(action.payload)
      state.project = action.payload
    })
  }
})

export const { increment, decrement, editProject } = dashboardSlice.actions

export const selectProject = (state) => state.project.project

export default dashboardSlice.reducer
