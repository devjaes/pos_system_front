import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'
import { ModalContainer } from '@/containers/ModalContainer'
import '../theme/globals.scss'
import Login from '@/pages/login/index'

// eslint-disable-next-line
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
      <ModalContainer />
      <Login />
    </PersistGate>
  </Provider>
)

export default MyApp
