import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoriesAPI } from './api/getCategoriesAPI'

const initialState = {
  notes: null
}

export const getCatgoriesAsync = createAsyncThunk('./api/getCategoriesAPI.js', async () => {
  const response = await getCategoriesAPI()
  return response
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    [getCatgoriesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload
    }
  }
})

export const { editProject } = notesSlice.actions

export const notesState = (state) => state.notes

export default notesSlice.reducer
