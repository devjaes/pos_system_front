import { createSelector } from '@reduxjs/toolkit'

import { IRootState } from '../store'

export const getModaltSelector = createSelector(
  (state: IRootState) => state.modal,
  (modal) => {
    const { isOpen, contentData, containerConfig } = modal

    const hasContent = Boolean(isOpen && contentData)

    return {
      hasContent,
      componentKey: contentData?.children.componentKey,
      componentProps: contentData?.children.props,
      containerConfig,
    }
  }
)
