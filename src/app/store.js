import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from '../features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import usersSlice from 'features/edit-user/usersSlice'
import accountSlice from 'features/account/accountSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist', 'dashboard']
}

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  auth: authReducer,
  users: usersSlice,
  account: accountSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
