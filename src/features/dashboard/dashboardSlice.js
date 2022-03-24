// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { registerAPI } from './api/registerAPI'
// import { loginUser } from './api/loginAPI'

// const initialState = {
//   currentUser: '',
//   jwt: ''
// }

// export const registerAsync = createAsyncThunk('./api/registerAPI.js', async (data) => {
//   const resData = await registerAPI(data)
//   return resData
// })

// export const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state = {
//         ...state,
//         currentUser: action.payload
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // .addCase(registerAsync.fulfilled, (state, action) => {
//       //   state.currentUser = action.payload
//       // })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.jwt = action.payload.jwt
//       })
//   }
// })

// export const { setCurrentUser, setJwt } = authSlice.actions

// export default authSlice.reducer
