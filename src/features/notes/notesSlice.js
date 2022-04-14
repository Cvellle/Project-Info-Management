import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getCategoriesAPI } from './api/getCategoriesAPI'
import { getNotesAPI } from './api/getNotesAPI'
import { getProjectAPI } from './api/getProjectAPI'

const initialState = {
  notes: [],
  filtered: [],
  categories: [],
  selectedProject: null,
  filterBy: {},
  sortBy: {}
}

export const getCatgoriesAsync = createAsyncThunk('./api/getCategoriesAPI.js', async () => {
  const response = await getCategoriesAPI()
  return response
})

export const getProjectAsync = createAsyncThunk('projects/getProject', async (id) => {
  const response = await getProjectAPI(id)
  return response.data
})

export const getNotesAsync = createAsyncThunk('projects/getNotesAPI', async (id) => {
  const response = await getNotesAPI(id)
  return response
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filterBy = {
        ...state.filterBy,
        [action.payload.filterProp]: action.payload.filterBy
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = {
        ...state.sortBy,
        sortKind: action.payload.sortKind,
        sortBy: action.payload.sortBy
      }
    }
  },
  extraReducers: {
    [getNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload
      state.filtered = action.payload
      console.log(state.filtered)
    },
    [getCatgoriesAsync.fulfilled]: (state, action) => {
      state.categories = action.payload
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload
    }
  }
})

export const { editProject, setFilterBy, setSortBy } = notesSlice.actions

export const notesState = (state) => state.notes
export const notes = (state) => state.notes.notes

export default notesSlice.reducer
