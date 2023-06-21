import axios from 'axios'
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

import { handleLoader, IHandleLoaderProps } from './handleLoader'
import { BaseQueryArgs } from './axiosBaseQuery'

interface IAxiosProps {
  api: BaseQueryApi
  url: string
  requestHeaders: { [key in string]: string }
}

type IHandleAxiosProps = Pick<IHandleLoaderProps, 'ref' | 'hideLoader'> &
  Pick<BaseQueryArgs, 'method' | 'data'> &
  IAxiosProps

export const handleAxios = async (handleAxiosProps: IHandleAxiosProps) => {
  const { ref, hideLoader, url, method, data, api, requestHeaders } =
    handleAxiosProps
  handleLoader({
    ref,
    isRemove: false,
    hideLoader,
    dispatch: api.dispatch,
  })

  const response = await axios({
    url,
    method,
    data,
    headers: requestHeaders,
  })

  handleLoader({
    ref,
    isRemove: true,
    hideLoader,
    dispatch: api.dispatch,
  })

  return response
}
