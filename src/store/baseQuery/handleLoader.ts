import { Dispatch } from '@reduxjs/toolkit'

import { removeLoaderItem, addLoaderItem } from '../slices/loaderSlice'

export interface IHandleLoaderProps {
  ref: string
  isRemove: boolean
  hideLoader: boolean
  dispatch: Dispatch
}

export const handleLoader = ({
  ref,
  isRemove,
  hideLoader,
  dispatch,
}: IHandleLoaderProps) => {
  if (hideLoader) {
    return null
  }
  if (isRemove) {
    dispatch(removeLoaderItem(ref))
  } else {
    dispatch(addLoaderItem(ref))
  }
}
