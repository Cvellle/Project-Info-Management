import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from '../features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist']
}

const rootReducer = combineReducers({
  auth: authReducer
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
