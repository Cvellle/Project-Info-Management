import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProjects } from './api/getProjects'

const initialState = {
  projects: [],
  status: 'idle',
  filterBy: {}
}

export const fetchItems = createAsyncThunk('projects/getProjects', async (payloadProp) => {
  const response = await getProjects(payloadProp)
  return await response.data
})

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects = [...state.projects, action.payload]
    },
    setFilterBy: (state, action) => {
      state.filterBy = { ...state.filterBy, name: action.payload }
    },
    resetProjects: (state) => {
      state.projects = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle'
        state.projects = action.payload
      })
  }
})

export const { setFilterBy, addProject, resetProjects } = dashboardSlice.actions

export const selectProjects = (state) => state.dashboard.projects
export const dashboardState = (state) => state.dashboard

export default dashboardSlice.reducer
