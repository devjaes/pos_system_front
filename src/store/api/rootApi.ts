import { createApi } from '@reduxjs/toolkit/query/react'

import serverConfig from '@/config/serverConfig'
import { axiosBaseQuery } from '../baseQuery/axiosBaseQuery'

export const ENDPOINTS_TAGS = {
  USER_ACCOUNT: 'USER_ACCOUNT',
  TODO: 'TODO',
}

export const rootApi = createApi({
  reducerPath: 'rootServices',
  baseQuery: axiosBaseQuery({
    baseUrl: serverConfig.API_REST_BASE_URL,
  }),
  endpoints: () => ({}),
  tagTypes: Object.values(ENDPOINTS_TAGS),
})
