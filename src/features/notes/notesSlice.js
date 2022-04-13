import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoriesAPI } from './api/getCategoriesAPI'
import { getProjecAPI } from './api/getProjecAPI'

const initialState = {
  notes: null,
  categories: [],
  selectedProject: null
}

export const getCatgoriesAsync = createAsyncThunk('./api/getCategoriesAPI.js', async () => {
  const response = await getCategoriesAPI()
  return response
})

export const getProjectAsync = createAsyncThunk('projects/getProject', async (id) => {
  const response = await getProjecAPI(id)
  return response.data
})

export const getNotesAsync = createAsyncThunk('projects/getProject', async (id) => {
  const response = await getProjecAPI(id)
  return response.data
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    [getCatgoriesAsync.fulfilled]: (state, action) => {
      state.categories = action.payload
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.selectedProject = action.payload
    }
  }
})

export const { editProject } = notesSlice.actions

export const notesState = (state) => state.notes

export default notesSlice.reducer
