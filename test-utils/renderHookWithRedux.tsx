import React from 'react'

import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { renderHook, RenderHookResult } from '@testing-library/react'

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { rootReducer } from '@/store/rootReducer'
import { rootApi } from '@/store/api/rootApi'

type CallBack<R> = () => R
type CommonState = { [key in string]: unknown }

export const renderHookWithRedux = <R, P = void>(
  cb: CallBack<R>,
  state?: CommonState
): RenderHookResult<R, P> => {
  const reducers = combineReducers({
    ...rootReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  })
  const store = configureStore({
    preloadedState: state,
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootApi.middleware),
  })
  const Wrapper: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
    children,
  }) => <Provider store={store}>{children}</Provider>

  return renderHook<R, P>(cb, { wrapper: Wrapper })
}
