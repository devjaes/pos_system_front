import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions } from '@testing-library/react'

import { IRootState } from '@/store/store'
import { rootReducer } from '@/store/rootReducer'
import { rootApi } from '@/store/api/rootApi'

interface IExtendedRenderOptions extends RenderOptions {
  state?: Partial<IRootState>
}

export const renderUIWithRedux = (
  ui: JSX.Element,
  options: IExtendedRenderOptions = {}
) => {
  const reducers = combineReducers({
    ...rootReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  })

  const store = configureStore({
    preloadedState: options.state,
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootApi.middleware),
  })
  const WrapperRoot = React.Fragment

  const Wrapper: React.FC<{ children: ReactElement | ReactElement[] }> = ({
    children,
  }) => (
    <WrapperRoot>
      <Provider store={store}>{children}</Provider>
    </WrapperRoot>
  )

  return rtlRender(ui, { wrapper: Wrapper })
}
