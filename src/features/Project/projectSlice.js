import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProject } from './api/pojectAPI'

const initialState = {
  selectedProject: null,
  loading: true
}

export const getProjectAsync = createAsyncThunk('projects/getProject', async (id) => {
  const response = await getProject(id)
  return response.data
})

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    emptyProject: (state) => {
      state = initialState
      return state
    }
  },
  extraReducers: {
    [getProjectAsync.pending]: (state) => {
      state.laodig = true
    },
    [getProjectAsync.fulfilled]: (state, action) => {
      state.selectedProject = action.payload
      state.laodig = false
    }
  }
})

export const { emptyProject } = projectSlice.actions

export const selectedProject = (state) => state.project.selectedProject
export const projectState = (state) => state.project

export default projectSlice.reducer
