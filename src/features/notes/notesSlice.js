import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoriesAPI } from './api/getCategoriesAPI'
import { getNotesAPI } from './api/getNotesAPI'
import { getProjectAPI } from './api/getProjectAPI'
import { postCategoryAPI } from './api/postCategoryAPI'
import { getNoteAPI } from './api/getNoteAPI'

const initialState = {
  status: 'iddle',
  notes: [],
  filtered: [],
  categories: [],
  selectedProject: null,
  selectedNote: null,
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

export const getNotesAsync = createAsyncThunk(
  'projects/getNotesAPI',
  async ({ id, name = '', sort = 'createdAt:desc', category }) => {
    const response = await getNotesAPI(id, name, sort, category)
    return response
  }
)

export const postCategoryAsync = createAsyncThunk('./api/postCategoryAPI.js', async (name) => {
  const response = await postCategoryAPI(name)
  return response.data.data
})

export const getNoteAsync = createAsyncThunk('notes/getNote', async (noteId) => {
  const response = await getNoteAPI(noteId)
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
    },
    resetNotes: (state) => {
      state.notes = []
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null
    }
  },
  extraReducers: {
    [getProjectAsync.fulfilled]: (state, action) => {
      state.selectedProject = action.payload
    },
    [getCatgoriesAsync.fulfilled]: (state, action) => {
      state.categories = action.payload
    },
    [getNotesAsync.pending]: (state) => {
      state.status = 'pending'
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.status = 'idle'
      state.notes = action.payload
    },
    [getNoteAsync.fulfilled]: (state, action) => {
      state.selectedNote = action.payload
    }
  }
})

export const { editProject, setFilterBy, setSortBy, resetNotes, clearSelectedNote } =
  notesSlice.actions

export const notesState = (state) => state.notes
export const notes = (state) => state.notes.notes
export const selectedNote = (state) => state.notes.selectedNote

export default notesSlice.reducer
