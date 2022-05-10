import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProject } from './api/pojectAPI'

const initialState = {
  selectedProject: null,
  loading: null,
  hasNotes: false
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
    },
    resetLoading: (state) => {
      state.loading = null
    }
  },
  extraReducers: {
    [getProjectAsync.pending]: (state) => {
      state.laodig = true
    },
    [getProjectAsync.fulfilled]: (state, action) => {
      action.payload.attributes.notes.data.length && (state.hasNotes = true)
      state.selectedProject = action.payload
      state.loading = false
    }
  }
})

export const { emptyProject, resetLoading } = projectSlice.actions

export const selectedProject = (state) => state.project.selectedProject
export const projectState = (state) => state.project

export default projectSlice.reducer
