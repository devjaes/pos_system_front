import { fireEvent } from '@testing-library/react'

import { renderUIWithRedux } from '@/test-utils/renderWithRedux'
import { CreateUpdateTodoModal } from '../CreateUpdateTodoModal'
import * as todoApi from '@/store/api/todoApi'

const useCreateTodoMock = jest.spyOn(todoApi, 'useCreateTodoMutation')

const createResult = {
  data: {
    id: 'some-id',
    description: 'new todo description',
  },
  error: null,
  reset: jest.fn(),
}

const createHandlerMock = jest.fn()

describe('Create-Update Todo Modal tests', () => {
  describe('when create a todo (success)', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      useCreateTodoMock.mockReturnValue([createHandlerMock, createResult])
    })

    it('should show new todo', () => {
      const screen = renderUIWithRedux(<CreateUpdateTodoModal />)
      const createButton = screen.getByText('create todo')

      fireEvent.click(createButton)

      expect(screen.getByText('new todo description')).toBeInTheDocument()
    })
  })

  describe('when create a todo (fails)', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      useCreateTodoMock.mockReturnValue([
        createHandlerMock,
        {
          data: null,
          isError: true,
          reset: jest.fn(),
        },
      ])
    })

    it('should not show the new todo', () => {
      const screen = renderUIWithRedux(<CreateUpdateTodoModal />)
      const createButton = screen.getByText('create todo')

      fireEvent.click(createButton)

      expect(screen.queryByText('new todo description')).not.toBeInTheDocument()
      expect(screen.getByText('Error on create a todo')).toBeInTheDocument()
    })
  })
})
