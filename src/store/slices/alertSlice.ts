import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

export type AlertTypes = 'SUCCESS' | 'DANGER' | 'WARNING' | 'INFO'

export interface IAlert {
  value: string
  title?: string
  type: AlertTypes
}

export interface IAlertsReducer {
  alertList: Array<IAlert>
}

const initialState: IAlertsReducer = {
  alertList: [],
}

export const alertsSlice = createSlice<
  IAlertsReducer,
  SliceCaseReducers<IAlertsReducer>
>({
  name: 'alerts',
  initialState,
  reducers: {
    addAlertItemArray: (state, action: PayloadAction<Array<IAlert>>) => {
      state.alertList = [...state.alertList, ...action.payload]
    },
    addAlertItem: (state, action: PayloadAction<IAlert>) => {
      state.alertList = [...state.alertList, action.payload]
    },
    removeAlertItemArray: (state, action: PayloadAction<Array<IAlert>>) => {
      state.alertList = state.alertList.filter((item) => {
        let ifExist = false
        action.payload.map((itemList) => {
          if (item.value === itemList.value) {
            ifExist = true
          }
        })
        if (!ifExist) {
          return item
        }
      })
    },
    removeAlertItem: (state, action: PayloadAction<IAlert>) => {
      state.alertList = state.alertList.filter(
        (item) => item.value !== action.payload.value
      )
    },
  },
})

export const {
  addAlertItem,
  addAlertItemArray,
  removeAlertItem,
  removeAlertItemArray,
} = alertsSlice.actions

export default alertsSlice.reducer
