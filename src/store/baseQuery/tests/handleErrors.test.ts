import { AxiosError } from 'axios'

import { waitFor } from '@testing-library/react'

import { IAlert } from '@/store/slices/alertSlice'
import { handleErrors } from '../handleErrors'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

const errors = {
  response: {
    status: 400,
    data: {
      errors: ['Some error message'],
    },
  },
} as AxiosError

describe('Handle Errors test', () => {
  const someActionMock = jest.fn()
  const dispatchMock = jest.fn()
  const errorMessage = {
    type: 'DANGER',
    title: 'some title',
    value: 'some Error message',
  } as IAlert

  beforeEach(() => jest.clearAllMocks())

  it('should return null', () => {
    handleErrors({
      errors,
      extraErrorsAction: undefined,
      hideError: true,
      dispatch: dispatchMock,
      errorMessage,
    })

    expect(dispatchMock).not.toHaveBeenCalled()
  })

  it('should dispatch error message', () => {
    handleErrors({
      errors,
      extraErrorsAction: someActionMock,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage,
    })
    expect(dispatchMock).toHaveBeenCalledTimes(2)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
    expect(someActionMock).toHaveBeenCalledTimes(1)
  })

  it('should not dispatch extra error action', () => {
    handleErrors({
      errors,
      extraErrorsAction: undefined,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage,
    })
    expect(dispatchMock).toHaveBeenCalledTimes(1)
  })

  it('should dispatch an api error message', () => {
    const apiError = {
      response: {
        status: 400,
        data: {
          message: 'Some api error message',
        },
      },
    } as AxiosError

    handleErrors({
      errors: apiError,
      extraErrorsAction: undefined,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage: undefined,
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        type: 'WARNING',
        value: 'Some api error message',
      },
      type: 'alerts/addAlertItem',
    })
  })

  it('should dispatch error message when status code is 404', () => {
    const errors = {
      response: {
        status: 404,
        data: {
          errors: ['Some error message'],
        },
      },
    } as AxiosError

    handleErrors({
      errors,
      extraErrorsAction: someActionMock,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage: undefined,
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        title: 'Solicitud Inválida',
        type: 'WARNING',
        value: '',
      },
      type: 'alerts/addAlertItem',
    })
  })

  it('should dispatch error message when status code is 401', () => {
    const errors = {
      response: {
        status: 401,
        data: {
          errors: ['Some error message'],
        },
      },
    } as AxiosError

    handleErrors({
      errors,
      extraErrorsAction: someActionMock,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage: undefined,
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        title: 'No tiene permisos para esta petición',
        type: 'WARNING',
        value: '',
      },
      type: 'alerts/addAlertItem',
    })
  })

  it('should dispatch error message when status code is 403', () => {
    const errors = {
      response: {
        status: 403,
        data: {
          errors: ['Some error message'],
        },
      },
    } as AxiosError

    handleErrors({
      errors,
      extraErrorsAction: someActionMock,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage: undefined,
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        title: 'No tiene permisos para esta petición',
        type: 'WARNING',
        value: '',
      },
      type: 'alerts/addAlertItem',
    })
  })

  it('should dispatch error message when status code is 500', () => {
    const errors = {
      response: {
        status: 500,
        data: {
          errors: ['Some error message'],
        },
      },
    } as AxiosError

    handleErrors({
      errors,
      extraErrorsAction: someActionMock,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage: undefined,
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        title: 'Error interno',
        type: 'DANGER',
        value: '',
      },
      type: 'alerts/addAlertItem',
    })
  })

  it('should remove alertItem', async () => {
    const errors = {
      response: {
        status: 500,
        data: {
          errors: ['Some error message'],
        },
      },
    } as AxiosError

    handleErrors({
      errors,
      extraErrorsAction: undefined,
      hideError: false,
      dispatch: dispatchMock,
      errorMessage,
    })

    jest.runOnlyPendingTimers()

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: {
          title: 'Error interno',
          type: 'DANGER',
          value: '',
        },
        type: 'alerts/removeAlertItem',
      })
    })
  })
})
