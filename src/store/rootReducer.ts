import loaderReducer from './slices/loaderSlice'
import alertsReducer from './slices/alertSlice'
import counterReducer from './slices/counterSlice'
import accountReducer from './slices/accountSlice'
import uiReducer from './slices/uiSlice'
import modalReducer from './slices/modalSlice'

export const rootReducer = {
  loader: loaderReducer,
  alerts: alertsReducer,
  counter: counterReducer,
  modal: modalReducer,
  account: accountReducer,
  ui: uiReducer,
}
