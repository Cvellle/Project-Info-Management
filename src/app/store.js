import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import projectsReducer from '../features/projects/projectsSlice';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['projectsReducer'],
};

const rootReducer = combineReducers({
  projects: projectsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});
