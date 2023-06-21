import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { DISPLAY_TIME } from '@/constants/apiErrors'
import { IAlert, addAlertItem, removeAlertItem } from '../slices/alertSlice'
import { IRootState } from '../store'
import { handleLoader } from './handleLoader'
import { IResponseAction, handleErrors } from './handleErrors'
import { handleAxios } from './handleAxios'

interface BaseQueryArgsCommon {
  url: (state: IRootState) => string
  extraErrorAction?: IResponseAction
  hideError?: boolean
  referenceErrorsKeys?: { [name: string]: string }
  hideLoader?: boolean
  extraSuccessActions?: IResponseAction[]
  successMessage?: IAlert
  errorMessage?: IAlert
  prepareExtraHeaders?: (
    headers: { [key in string]: string },
    state: IRootState
  ) => { [key in string]: string }
  useCustomUrl?: (state: IRootState) => string
}

interface BaseQueryArgsA extends BaseQueryArgsCommon {
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  data?: AxiosRequestConfig['data']
}

interface BaseQueryArgsB extends BaseQueryArgsCommon {
  method: 'GET'
  data?: never
}

export type BaseQueryArgs = BaseQueryArgsA | BaseQueryArgsB

type ISuccessActionsProps = { api: BaseQueryApi; result: AxiosResponse } & Pick<
  BaseQueryArgs,
  'extraSuccessActions' | 'successMessage'
>

const dispatchSuccessActions = (successActionsProps: ISuccessActionsProps) => {
  const { successMessage, api, extraSuccessActions, result } =
    successActionsProps

  if (extraSuccessActions) {
    extraSuccessActions.map((action) => {
      api.dispatch(action(result.data))
    })
  }

  if (successMessage) {
    api.dispatch(addAlertItem(successMessage))
    setTimeout(() => {
      api.dispatch(removeAlertItem(successMessage))
    }, DISPLAY_TIME)
  }
}

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string
  }): BaseQueryFn<BaseQueryArgs, unknown, unknown> =>
  async (
    {
      url,
      method,
      data,
      extraErrorAction,
      hideError,
      hideLoader = false,
      extraSuccessActions,
      successMessage,
      errorMessage,
      prepareExtraHeaders,
      useCustomUrl,
    },
    api
  ) => {
    const state = api.getState() as IRootState
    const token = state?.account?.user?.token
    const urlPath = url(state)
    const requestReference = `${new Date().getTime()}/${urlPath}-${method}`

    const headers = {} as { [key in string]: string }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const requestHeaders = prepareExtraHeaders
      ? prepareExtraHeaders(headers, state)
      : headers

    try {
      let url = `${baseUrl}/${urlPath}`

      if (useCustomUrl) {
        url = useCustomUrl(state)
      }

      const result = await handleAxios({
        ref: requestReference,
        hideLoader,
        url,
        method,
        data,
        api,
        requestHeaders,
      })

      dispatchSuccessActions({
        extraSuccessActions,
        successMessage,
        api,
        result,
      })

      return { data: result.data }
    } catch (axiosError) {
      handleLoader({
        ref: requestReference,
        isRemove: true,
        hideLoader,
        dispatch: api.dispatch,
      })
      const err = axiosError as AxiosError
      if (err) {
        handleErrors({
          errors: err,
          extraErrorsAction: extraErrorAction,
          hideError: !!hideError,
          dispatch: api.dispatch,
          errorMessage,
        })
      }

      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
