import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

export interface ILoaderState {
  loader: string[]
}

const initialState: ILoaderState = {
  loader: [],
}

export const loaderSlice = createSlice<
  ILoaderState,
  SliceCaseReducers<ILoaderState>
>({
  name: 'loader',
  initialState,
  reducers: {
    addLoaderItem: (state, { payload }: PayloadAction<string>) => {
      state.loader = [...state.loader, payload]
    },
    removeLoaderItem: (state, { payload }: PayloadAction<string>) => {
      state.loader = state.loader.filter((item) => item !== payload)
    },
  },
})

export const { addLoaderItem, removeLoaderItem } = loaderSlice.actions

export default loaderSlice.reducer
