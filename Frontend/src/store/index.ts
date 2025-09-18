import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import newsSlice from './slices/newsSlice'
import placesSlice from './slices/placesSlice'
import healthcareSlice from './slices/healthcareSlice'
import jobsSlice from './slices/jobsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
}

const rootReducer = combineReducers({
  auth: authSlice,
  news: newsSlice,
  places: placesSlice,
  healthcare: healthcareSlice,
  jobs: jobsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
