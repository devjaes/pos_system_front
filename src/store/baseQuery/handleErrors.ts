import { Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { HTTP_RESPONSE_CODE, API_ERRORS } from '@/constants/apiErrors'
import { IAlert, removeAlertItem, addAlertItem } from '../slices/alertSlice'

interface IDispatchErrosMessageProps {
  errorStatus: number | undefined
  isRemove: boolean
  dispatch: Dispatch
  apiErrorMessage: string
  errorMessage: IAlert | undefined
}

interface IHandleErrorsProps {
  errors: AxiosError
  extraErrorsAction: IResponseAction | undefined
  hideError: boolean
  dispatch: Dispatch
  errorMessage: IAlert | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IResponseAction = (response: any) => PayloadAction<any>

const dispatchErrorMessage = ({
  errorStatus,
  isRemove,
  dispatch,
  apiErrorMessage,
  errorMessage,
}: IDispatchErrosMessageProps) => {
  const errorAction = isRemove ? removeAlertItem : addAlertItem
  if (
    errorMessage &&
    errorStatus &&
    errorStatus !== HTTP_RESPONSE_CODE.ERROR_500
  ) {
    return dispatch(errorAction(errorMessage))
  }

  if (apiErrorMessage) {
    return dispatch(
      errorAction({
        type: 'WARNING',
        value: apiErrorMessage,
      })
    )
  }

  switch (errorStatus) {
    case HTTP_RESPONSE_CODE.ERROR_404:
      return dispatch(
        errorAction({
          title: API_ERRORS.ERROR_404,
          type: 'WARNING',
          value: '',
        })
      )
    case HTTP_RESPONSE_CODE.ERROR_401:
    case HTTP_RESPONSE_CODE.ERROR_403:
      return dispatch(
        errorAction({
          title: API_ERRORS.ERROR_401,
          type: 'WARNING',
          value: '',
        })
      )
    case HTTP_RESPONSE_CODE.ERROR_500:
      return dispatch(
        errorAction({
          title: API_ERRORS.ERROR_500,
          type: 'DANGER',
          value: '',
        })
      )
    default:
      return dispatch(
        errorAction({
          title: 'Api Error',
          type: 'DANGER',
          value: '',
        })
      )
  }
}

export const handleErrors = ({
  errors,
  extraErrorsAction,
  hideError,
  dispatch,
  errorMessage,
}: IHandleErrorsProps) => {
  const apiErrorMessage = errors.response?.data?.message

  if (extraErrorsAction) {
    dispatch(extraErrorsAction(errors.response?.data))
  }
  if (hideError) {
    return null
  }
  dispatchErrorMessage({
    errorStatus: errors?.response?.status,
    isRemove: false,
    dispatch,
    apiErrorMessage,
    errorMessage,
  })

  const ALERT_ACTIVE_TIME = 5000
  setTimeout(() => {
    dispatchErrorMessage({
      errorStatus: errors?.response?.status,
      isRemove: true,
      dispatch,
      apiErrorMessage,
      errorMessage,
    })
  }, ALERT_ACTIVE_TIME)
}
