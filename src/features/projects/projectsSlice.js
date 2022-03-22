import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProjects } from './api/projectsAPI'

const initialState = {
  projects: [],
  status: 'idle'
}

export const fetchItems = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetchProjects()
  return response.data
})

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    editProject: (state, action) => {
      let currentId = action.payload.id
      state.projects = [
        ...state.projects.slice(0, currentId - 1),
        action.payload,
        ...state.projects.slice(currentId)
      ]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle'
        state.projects += action.payload
      })
  }
})

export const { increment, decrement, editProject } = projectsSlice.actions

export const selectProjects = (state) => state.projects.projects

export const incrementIfOdd = () => (dispatch, getState) => {
  const currentValue = selectProjects(getState())
  if (currentValue.length > 0) {
    // dispatch(...);
  }
}

export default projectsSlice.reducer
