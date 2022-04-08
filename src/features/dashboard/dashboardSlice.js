import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItems } from './api/getItems'

const initialState = {
  projects: [],
  status: 'idle',
  filterBy: {}
}

export const fetchItems = createAsyncThunk('./api/getItems.js', async () => {
  const response = await getItems()
  return response.data
})

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    editProject: (state, action) => {
      let currentId = action.payload.id
      state.projects = [
        ...state.projects.slice(0, currentId - 1),
        action.payload,
        ...state.projects.slice(currentId)
      ]
    },
    setFilterBy: (state, action) => {
      state.filterBy = { ...state.filterBy, name: action.payload }
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

export const { editProject, setFilterBy } = dashboardSlice.actions

export const selectProjects = (state) => state.dashboard.projects
export const dashboardState = (state) => state.dashboard

export default dashboardSlice.reducer
