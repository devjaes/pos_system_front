import { act, waitFor } from '@testing-library/react'

import axiosMock from '@/test-utils/mocks/axiosMock'
import { renderHookWithRedux } from '@/test-utils/renderHookWithRedux'
import { useFindTodosQuery, useCreateTodoMutation } from '../todoApi'

const findTodoApiResponse = {
  data: [
    {
      _id: 'some-id',
      description: 'some-description',
    },
  ],
  total: 1,
}

const createTodoApiResponse = {
  _id: 'some-id',
  description: 'new todo description',
}

describe('Todo api tests', () => {
  describe('when find todos hook render', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when requests succcess', () => {
      beforeEach(() => {
        axiosMock.resolveValue(findTodoApiResponse)
      })

      it('should return todos', async () => {
        const { result } = renderHookWithRedux(() => useFindTodosQuery())

        await waitFor(() => {
          expect(result.current.data?.data[0].id).toBe('some-id')
          expect(result.current.data?.data[0].description).toBe(
            'some-description'
          )
          expect(result.current.data?.total).toBe(1)
        })
      })
    })

    describe('when requests fails', () => {
      beforeEach(() => {
        axiosMock.rejectValue({
          response: {
            data: {
              message: 'some error message',
            },
          },
        })
      })

      it('should not return todos', async () => {
        const { result } = renderHookWithRedux(() => useFindTodosQuery())

        await waitFor(() => {
          expect(result.current.isError).toBe(true)
          expect(result.current.error).toEqual({
            data: {
              message: 'some error message',
            },
          })
        })
      })
    })
  })

  describe('when create todos hook render', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when requests succcess', () => {
      beforeEach(() => {
        axiosMock.resolveValue(createTodoApiResponse)
      })

      it('should return a new todo', async () => {
        const { result } = renderHookWithRedux(() => useCreateTodoMutation())

        const [createHandler] = result.current

        act(() => {
          createHandler({ description: 'new todo description' })
        })

        await waitFor(() => {
          const createResult = result.current[1]

          expect(createResult.data?.id).toBe('some-id')
          expect(createResult.data?.description).toBe('new todo description')
        })
      })
    })

    describe('when requests fails', () => {
      beforeEach(() => {
        axiosMock.rejectValue({
          response: {
            data: {
              message: 'some error message',
            },
          },
        })
      })

      it('should return an error', async () => {
        const { result } = renderHookWithRedux(() => useCreateTodoMutation())
        const [createHandler] = result.current

        act(() => {
          createHandler({ description: 'new todo description' })
        })

        await waitFor(() => {
          const createResult = result.current[1]

          expect(createResult.isError).toBe(true)
          expect(createResult.error).toEqual({
            data: {
              message: 'some error message',
            },
          })
        })
      })
    })
  })
})
