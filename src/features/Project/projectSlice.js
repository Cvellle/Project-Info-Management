import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProject } from './api/pojectAPI'

const initialState = {
  selectedProject: null
}

export const getProjectAsync = createAsyncThunk('projects/getProject', async (id) => {
  const response = await getProject(id)
  return response.data
})

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [getProjectAsync.fulfilled]: (state, action) => {
      state.selectedProject = action.payload
    }
  }
})

export const { editProject } = projectSlice.actions

export const selectedProject = (state) => state.project.selectedProject

export default projectSlice.reducer
