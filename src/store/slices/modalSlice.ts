import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { MODALS } from '@/constants/modals'
export interface IContainerConfig {
  modalAlign?: 'end' | 'center'
  hideCloseIcon?: boolean
  fullHeight?: boolean
}

const DEFAULT_CONTAINER_CONFIG = {
  modalAlign: 'center',
  hideCloseIcon: false,
  fullHeight: false,
} as IContainerConfig

export interface IModalState {
  containerConfig: IContainerConfig
  contentData?: {
    children: {
      props: { [key in string]: unknown }
      componentKey: keyof typeof MODALS
    }
  }
  isOpen: boolean
}

const initialState = {
  containerConfig: DEFAULT_CONTAINER_CONFIG,
  isOpen: false,
} as IModalState

export interface IOpenModalComponentPayload {
  config?: IContainerConfig
  componentProps: { [key in string]: unknown }
  componentKey: keyof typeof MODALS
}

export const modalSlice = createSlice<
  IModalState,
  SliceCaseReducers<IModalState>
>({
  name: 'modalSlice',
  initialState,
  reducers: {
    closeModal: (state) => ({
      containerConfig: {
        ...DEFAULT_CONTAINER_CONFIG,
        modalAlign: state.containerConfig.modalAlign,
      },
      isOpen: false,
    }),
    openModalComponent: (
      state,
      action: PayloadAction<IOpenModalComponentPayload>
    ) => {
      const containerConfig = action.payload?.config || {}

      return {
        ...state,
        containerConfig: {
          ...DEFAULT_CONTAINER_CONFIG,
          ...containerConfig,
        },
        contentData: {
          children: {
            componentKey: action.payload.componentKey,
            props: action.payload.componentProps,
          },
        },
        isOpen: true,
      }
    },
  },
})

export const { closeModal, openModalComponent } = modalSlice.actions

export default modalSlice.reducer
