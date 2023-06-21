import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUi {
  isTodosModalOpen?: boolean
}

export interface IUiState {
  ui: IUi
}

const initialState: IUiState = {
  ui: { isTodosModalOpen: false },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUiState: (state, { payload }: PayloadAction<IUi>) => {
      state.ui.isTodosModalOpen = payload.isTodosModalOpen
    },
  },
})

export const { setUiState } = uiSlice.actions

export default uiSlice.reducer
