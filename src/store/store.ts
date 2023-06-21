import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { rootReducer } from './rootReducer'
import { rootApi } from './api/rootApi'

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['account', 'ui'],
  storage,
}

const reducers = combineReducers({
  ...rootReducer,
  [rootApi.reducerPath]: rootApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch
