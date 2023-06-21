import { waitFor } from '@testing-library/react'
import * as axios from 'axios'

import { axiosBaseQuery } from '../axiosBaseQuery'
import { IAlert } from '@/store/slices/alertSlice'
import axiosMock from 'test-utils/mocks/axiosMock'
import { HTTP_RESPONSE_CODE } from '@/constants/apiErrors'

jest.spyOn(global, 'setTimeout')
jest.spyOn(global, 'clearInterval')
jest.mock('axios')
jest.useFakeTimers()

const dispatchMock = jest.fn()

const apiMock = {
  dispatch: dispatchMock,
  getState: jest.fn(),
  // eslint-disable-next-line
} as any

const testBaseUrl = {
  baseUrl: 'http://some-domain/some-endpoint/',
}

// eslint-disable-next-line
const urlFactory = (fn: any) => fn

const testData = { name: 'Name' }
const actionMock = jest.fn()
const extraAction = jest.fn()
const successMessage = {
  type: 'SUCCESS',
  title: 'Success Message',
  value: 'some-value',
} as IAlert
const errorMessage = {
  type: 'DANGER',
  title: 'Error Message',
  value: 'some-value',
} as IAlert

describe('Axios base query tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('when request fails', () => {
    beforeEach(() => {
      axiosMock.rejectValue({
        response: {
          data: {
            error: 'Some error',
          },
        },
      } as axios.AxiosError)
    })

    it('should return an error', async () => {
      const response = await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'POST',
          extraErrorAction: actionMock,
        },
        apiMock,
        {}
      )

      expect(response.error).toBeTruthy()
    })

    it('should dispatch an extra error action', async () => {
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'POST',
          data: testData,
          extraErrorAction: actionMock,
        },
        apiMock,
        {}
      )
      expect(actionMock).toHaveBeenCalled()
    })
  })

  describe('when request fails with status code 404', () => {
    beforeEach(() => {
      axiosMock.rejectValue({
        response: {
          status: HTTP_RESPONSE_CODE.ERROR_404,
          data: {
            error: 'Some error',
          },
        },
      } as axios.AxiosError)
    })

    it('should dispatch an error message', async () => {
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'POST',
          errorMessage,
          hideError: false,
        },
        apiMock,
        {}
      )
      expect(apiMock.dispatch).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          title: 'Error Message',
          type: 'DANGER',
          value: 'some-value',
        }),
        type: 'alerts/addAlertItem',
      })
      jest.runOnlyPendingTimers()

      expect(apiMock.dispatch).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          title: 'Error Message',
          type: 'DANGER',
          value: 'some-value',
        }),
        type: 'alerts/removeAlertItem',
      })
    })
  })

  describe('when requests is success', () => {
    beforeEach(() => {
      axiosMock.resolveValue({
        data: {},
      })
    })

    it('should dispatch some action', async () => {
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'GET',
          extraErrorAction: actionMock,
          hideError: false,
          hideLoader: false,
          extraSuccessActions: [extraAction],
          successMessage,
          errorMessage,
        },
        apiMock,
        {}
      )
      await waitFor(() => {
        expect(apiMock.dispatch).toHaveBeenCalled()
      })
    })

    it('should call axios with headers', async () => {
      const apiMockWithToken = {
        dispatch: dispatchMock,
        getState: jest.fn(() => ({
          account: {
            user: {
              token: 'some-token',
            },
          },
        })),
        // eslint-disable-next-line
      } as any
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'GET',
          prepareExtraHeaders: (headers) => {
            headers['apikey'] = 'some-api-key'

            return headers
          },
        },
        apiMockWithToken,
        {}
      )
      await waitFor(() => {
        expect(axios).toHaveBeenCalledWith({
          url: expect.any(String),
          method: 'GET',
          headers: {
            apikey: 'some-api-key',
            Authorization: 'Bearer some-token',
          },
        })
      })
    })

    it('should dispatch success action', async () => {
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'GET',
          extraSuccessActions: [extraAction],
          successMessage,
        },
        apiMock,
        {}
      )

      expect(extraAction).toHaveBeenCalled()
    })

    it('should dispatch an success message', async () => {
      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'GET',
          extraSuccessActions: [extraAction],
          successMessage,
          hideError: false,
        },
        apiMock,
        {}
      )

      expect(apiMock.dispatch).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          title: 'Success Message',
          type: 'SUCCESS',
          value: 'some-value',
        }),
        type: 'alerts/addAlertItem',
      })

      jest.runOnlyPendingTimers()

      expect(apiMock.dispatch).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          title: 'Success Message',
          type: 'SUCCESS',
          value: 'some-value',
        }),
        type: 'alerts/removeAlertItem',
      })
    })
  })

  describe('when use callback useCustomUrl', () => {
    beforeEach(() => {
      axiosMock.resolveValue({
        data: {},
      })
    })

    it('should use a customUrl instead baseUrl', async () => {
      const apiMockWithUserId = {
        dispatch: dispatchMock,
        getState: jest.fn(() => ({
          account: {
            user: {
              id: 'some-user-id',
            },
          },
        })),
        // eslint-disable-next-line
      } as any

      await axiosBaseQuery(testBaseUrl)(
        {
          url: urlFactory,
          method: 'GET',
          useCustomUrl: (state) => {
            const userId = state.account.user.id

            return `https://my-custom-domain/user/${userId}`
          },
        },
        apiMockWithUserId,
        {}
      )
      await waitFor(() => {
        expect(axios).toHaveBeenCalledWith(
          expect.objectContaining({
            url: 'https://my-custom-domain/user/some-user-id',
          })
        )
      })
    })
  })
})
